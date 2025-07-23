require('dotenv').config();
const startTelegramBot = require('./telegram/telegram');
const startWhatsAppBot = require('./whatsapp/whatsapp');

// Start Telegram bot
startTelegramBot();

// Start WhatsApp bot
startWhatsAppBot();

console.log("✅ BugLink-MP Bot running on both Telegram and WhatsApp...");
