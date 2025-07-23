const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'menu',
  description: 'Show the bug command menu',
  type: 'bot',
  async execute(sock, m) {
    const imagePath = path.join(__dirname, '../media/menu.jpg');
    const imageBuffer = fs.readFileSync(imagePath);

    const caption = `
🧠 *SamaritanOmeh-v1 — Bug Command Menu*

💥 *Crash & Lag Tools*
• .crash – Classic crash bomb
• .androidkill <num> – Android freeze
• .ioscrash <num> – iOS killer
• .lag – Massive lag dropper
• .fakecrash – Fake media crash
• .invisiblecrash – Invisible payload
• .mentionbug – Flood via mentions

🛡 *Bug Utilities*
• .bugmenu – List all bugs

🛠 *Pair WhatsApp:* /pair <number>
    `.trim();

    await sock.sendMessage(m.chat, {
      image: imageBuffer,
      caption,
    }, { quoted: m });
  }
};
