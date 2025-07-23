const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'bugmenu',
  alias: ['bugs', 'bug'],
  description: 'Displays available bug commands',
  category: 'bug',

  async run(bot, msg, args, platform) {
    const mediaPath = path.join(__dirname, '../media/bug.jpg');
    const caption = `
💣 *BUGLINK MP - CRASH & LAG TOOLS* 💣

╭───「 ⚠️ CRASH ZONE ⚠️ 」───╮
│
├ 📛 .lag <number>
├ 📛 .mentionbug <number>
├ 📛 .androidkill <number>
├ 📛 .ioscrash <number>
├ 📛 .fakecrash <number>
├ 📛 .invisiblecrash <number>
│
╰──────────────────────────╯

Type any command above to execute the bug 🔥
`;

    await bot.sendImage(msg.chat.id, mediaPath, caption);
  }
};
