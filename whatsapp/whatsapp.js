const {
    default: makeWASocket,
    useMultiFileAuthState,
    makeInMemoryStore,
    fetchLatestBaileysVersion,
    generateWAMessageFromContent,
    jidDecode,
    getAggregateVotesInPollMessage
} = require("@whiskeysockets/baileys");

const express = require("express");
const fs = require("fs");
const path = require("path");

const sessions = {}; // Holds active session sockets

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
    const number = req.body.number;
    if (!number) return res.status(400).json({ error: "Number is required" });

    const sessionPath = path.join(__dirname, `../sessions/${number}`);
    fs.mkdirSync(sessionPath, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        browser: ['BugLinkMP', 'Safari', '1.0.0'],
        generateHighQualityLinkPreview: true
    });

    sessions[number] = sock;

    sock.ev.on("connection.update", async (update) => {
        const { connection, pairingCode } = update;
        if (pairingCode) {
            res.json({ code: pairingCode });
        }

        if (connection === "close") {
            console.log(`🔌 Session for ${number} closed.`);
            delete sessions[number];
        }
    });

    sock.ev.on("creds.update", saveCreds);
});

function startWhatsAppServer() {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`📡 WhatsApp server running on port ${port}`);
    });
}

module.exports = startWhatsAppServer;
