const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'fakecrash',
  alias: [],
  description: 'Sends a fake crash message for prank or test',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];
    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Please provide a number.\n\nExample:\n.fakecrash 233XXXXXXXXX');
    }

    const jid = `${target}@s.whatsapp.net`;

    try {
      // Load the fake corrupted crash text (pre-saved)
      const crashText = fs.readFileSync(path.join(__dirname, '../media/crash.txt'), 'utf8');

      await bot.sendMessage(jid, { text: crashText });
      await bot.sendMessage(msg.chat.id, `✅ Fake crash message sent to ${target}`);
    } catch (err) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to send fake crash.\n\n${err.message}`);
    }
  }
};
