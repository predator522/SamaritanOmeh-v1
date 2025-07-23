const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');

async function handlePairCommand(bot, chatId, number) {
  const sessionFolder = path.join(__dirname, '../../sessions', number);
  fs.mkdirSync(sessionFolder, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { pairingCode, isOnline, connection } = update;

    if (pairingCode) {
      await bot.sendMessage(chatId, `✅ Pairing Code for *${number}*\n\n🔑 *${pairingCode}*\n\nGo to *WhatsApp > Linked Devices > Add Device > Enter Code*`);
    }

    if (connection === 'open') {
      await bot.sendMessage(chatId, `✅ *${number}* successfully paired!`);
      await sock.ws.close();
    }

    if (connection === 'close') {
      if (update.lastDisconnect?.error instanceof Boom) {
        await bot.sendMessage(chatId, `❌ Connection closed: ${update.lastDisconnect.error.message}`);
      }
    }
  });

  await sock.waitForSocketOpen();
  await sock.requestPairingCode(number + '@s.whatsapp.net');
}

module.exports = { handlePairCommand };
