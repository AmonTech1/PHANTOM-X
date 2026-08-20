const { cmd } = require("../phantom");
const moment = require("moment");
const { fakevCard } = require('../lib/fakevCard');

let botStartTime = Date.now();
const ALIVE_IMG = "https://i.ibb.co/PsWdw53t/phantom-x.jpg";

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "owner",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User";
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✦ ʜᴇʟʟᴏ ${pushname} ✦

    ⌚ ᴛɪᴍᴇ : ${currentTime}
    📆 ᴅᴀᴛᴇ : ${currentDate}
    ⏱ ᴜᴘᴛɪᴍᴇ : ${runtimeHours}h ${runtimeMinutes}m ${runtimeSeconds}s

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ ⚡
✧══════════════════════✧
        `.trim();

        if (!ALIVE_IMG || !ALIVE_IMG.startsWith("http")) {
            throw new Error("Invalid ALIVE_IMG URL. Please set a valid image URL.");
        }

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363406476499117@newsletter',
                    newsletterName: 'ᴘʜᴀɴᴛᴏᴍ-x',
                    serverMessageId: 143
                }
            }
        }, { quoted: fakevCard });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});