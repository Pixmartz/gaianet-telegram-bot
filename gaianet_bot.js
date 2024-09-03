
### `gaianet_bot.js`

```javascript
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

// Initialize the bot with your token
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// List of API endpoints and related models
const API_ENDPOINTS = {
  TweetWriter: {
    url: 'https://tweet-writer.us.gaianet.network/v1/chat/completions',
    model: 'Qwen1.5-7B-Chat-Q5_K_M',
  },
  Cover_Letter: {
    url: 'https://cover-letter-helper.us.gaianet.network/v1/chat/completions',
    model: 'Phi-3-mini-4k-instruct',
  },
  Bible: {
    url: 'https://bible.us.gaianet.network/v1/chat/completions',
    model: 'Meta-Llama-3-8B-Instruct-Q5_K_M',
  },
};

// Store user-selected API per user
const userSelections = {};

// Handler for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'TweetWriter', callback_data: 'TweetWriter' },
          { text: 'Cover_Letter', callback_data: 'Cover_Letter' },
          { text: 'Bible', callback_data: 'Bible' },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, 'Please choose the API you want to use:', options);
});

// Handler for API selection via buttons
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const selectedApi = callbackQuery.data;

  if (API_ENDPOINTS[selectedApi]) {
    userSelections[chatId] = API_ENDPOINTS[selectedApi];
    bot.sendMessage(chatId, `You have selected the ${selectedApi} API. Now you can send a message.`);
  } else {
    bot.sendMessage(chatId, 'Invalid API selection. Please try again.');
  }
});

// Handler for text messages from users
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore command messages (/start)
  if (text.startsWith('/')) return;

  const userApi = userSelections[chatId];

  if (!userApi) {
    bot.sendMessage(chatId, 'Please select an API first by sending the /start command.');
    return;
  }

  // Send request to the selected API
  try {
    const response = await axios.post(userApi.url, {
      model: userApi.model,
      messages: [{ role: 'user', content: text }],
    });

    const reply = response.data.choices && response.data.choices[0].message.content;

    if (reply) {
      bot.sendMessage(chatId, reply);
    } else {
      bot.sendMessage(chatId, 'Sorry, no response from the API.');
    }
  } catch (error) {
    console.error('Error contacting API:', error);
    bot.sendMessage(chatId, 'An error occurred while contacting the API. Please try again later.');
  }
});

console.log('Bot is running...');
