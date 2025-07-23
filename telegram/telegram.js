const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// /start command
bot.start((ctx) => {
    ctx.reply(`🤖 Welcome to BugLink-MP Bot!\nUse /pair <number> to get a WhatsApp 8-digit login code.`);
});

// /menu command
bot.command('menu', async (ctx) => {
    const menuText = `
📛 *Bug Commands Menu*
────────────────────
• .lag
• .mentionbug
• .fakecrash
• .invisiblecrash
• .androidkill <num>
• .ioscrash <num>
• .spam <num>
• .bugmenu

Deploy carefully 😈
`;

    try {
        const imagePath = path.join(__dirname, '../media/bugmenu.jpg');
        await ctx.replyWithPhoto({ source: imagePath }, { caption: menuText, parse_mode: "Markdown" });
    } catch (err) {
        ctx.reply("⚠️ Menu image missing. Please add bugmenu.jpg in /media folder.");
    }
});

// /pair <number> command
bot.command('pair', async (ctx) => {
    const input = ctx.message.text.split(" ");
    if (input.length < 2) {
        return ctx.reply("❌ Usage: /pair <number>");
    }

    const number = input[1];
    ctx.reply(`⏳ Generating pairing code for *${number}*...`, { parse_mode: "Markdown" });

    try {
        const response = await axios.post(`http://localhost:${process.env.PORT}/generate`, { number });
        if (response.data && response.data.code) {
            ctx.reply(`✅ *Pairing Code:*\n\`${response.data.code}\`\n\nUse this on WhatsApp (Linked Devices)`, { parse_mode: "Markdown" });
        } else {
            ctx.reply("❌ Failed to generate code. Check the WhatsApp system.");
        }
    } catch (e) {
        console.error(e.message);
        ctx.reply("❌ Error generating code. Try again.");
    }
});

// Start bot
function startTelegramBot() {
    bot.launch();
    console.log("🤖 Telegram bot started");
}

module.exports = startTelegramBot;
