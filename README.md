# GaiaNet Telegram Bot

This repository contains a Telegram bot that interacts with various GaiaNet APIs, allowing users to generate tweets, create cover letters, and access the Bible through simple commands.

## Prerequisites

Before starting, ensure you have the following tools installed:

- **Node.js and npm**: Download and install from the [Node.js official website](https://nodejs.org/).
- **A text editor**: Such as Visual Studio Code.
- **A Telegram account**: To create and interact with your bot.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/gaianet-telegram-bot.git
    cd gaianet-telegram-bot
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Telegram bot token:

    ```bash
    TOKEN=your-telegram-bot-token
    ```

## Usage

1. **Run the bot:**

    ```bash
    node gaianet_bot.js
    ```

2. **Interacting with the bot on Telegram:**

   - Start a chat with your bot by searching for its username on Telegram.
   - Send the `/start` command to initiate interaction.
   - Select an API (TweetWriter, Cover Letter, or Bible) from the menu.
   - Send any text message to the bot, and it will return a response based on the selected API.

## APIs Used

### TweetWriter API
- **URL**: `https://tweet-writer.us.gaianet.network/v1/chat/completions`
- **Model**: `Qwen1.5-7B-Chat-Q5_K_M`
- **Purpose**: Helps users generate tweets or short text content.

### Cover Letter API
- **URL**: `https://cover-letter-helper.us.gaianet.network/v1/chat/completions`
- **Model**: `Phi-3-mini-4k-instruct`
- **Purpose**: Assists users in creating professional cover letters.

### Bible API
- **URL**: `https://bible.us.gaianet.network/v1/chat/completions`
- **Model**: `Meta-Llama-3-8B-Instruct-Q5_K_M`
- **Purpose**: Allows users to search and retrieve content from the Bible.

Or you need explore gaianet other GaiaNet AI Agents: https://www.gaianet.ai/agents

## Handling Errors and Debugging

- **Connection Errors**: Ensure your internet connection is stable and the API URLs are correct.
- **Invalid API Responses**: Review the response structure and adjust the parsing code as necessary.
- **Token Errors**: Ensure that your Telegram bot token is correct and the bot is activated via BotFather.
- **Logging**: Add more logging to monitor bot activity and track errors.

## Further Extensions and Customization

- **Adding More APIs**: Add more APIs by including new entries in the `API_ENDPOINTS` object.
- **Storing Conversation History**: Store conversation history per user for more complex interactions.
- **Default Settings**: Set a default API if the user hasn’t selected one.
- **Usage Limits**: Implement mechanisms to limit the number of requests or add authentication if needed.

