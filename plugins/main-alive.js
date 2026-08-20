const { cmd, commands } = require('../phantom');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const status = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👑 ɪ ᴀᴍ ᴀʟɪᴠᴇ & ʀᴇᴀᴅʏ

    ⚙️ ᴍᴏᴅᴇ : ${config.MODE || 'private'}
    👤 ᴏᴡɴᴇʀ : ${config.OWNER_NAME || 'PHANTOM-X'}
    🔤 ᴘʀᴇғɪx : ❮ ${config.PREFIX || '.'} ❯
    📦 ᴠᴇʀsɪᴏɴ : 1.0.0
    📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : ${totalCmds}
    ⏱ ᴜᴘᴛɪᴍᴇ : ${uptime()}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;

        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
        `.trim());
    }
});