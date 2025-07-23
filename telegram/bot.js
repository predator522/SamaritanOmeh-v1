const TelegramBot = require('node-telegram-bot-api');
const pairHandler = require('./handlers/pairHandler');

// Load your .env token
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Listen to /pair command
bot.onText(/^\/pair (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const number = match[1];

  if (!/^\d{7,15}$/.test(number)) {
    return bot.sendMessage(chatId, '❌ Invalid number. Example:\n/pair 233XXXXXXXXX');
  }

  await pairHandler.handlePairCommand(bot, chatId, number);
});

module.exports = bot;
