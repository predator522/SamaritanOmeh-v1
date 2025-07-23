require('dotenv').config();
require('./telegram/bot');
const startTelegramBot = require('./telegram/telegram');
const startWhatsAppBot = require('./whatsapp/whatsapp');

// Start Telegram bot
startTelegramBot();

// Start WhatsApp bot
startWhatsAppBot();

console.log("SamaritanOmeh-v1 Bot running on both Telegram and WhatsApp...")
