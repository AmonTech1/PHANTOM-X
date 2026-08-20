const { cmd, commands } = require('../phantom');
const config = require('../config');
const os = require('os');

// =================================================================
// 🏓 UPTIME COMMAND (Speed & Resources)
// =================================================================
cmd({
    pattern: "uptime",
    alias: ["speed", "ping", "status"],
    desc: "Check latency and system resources",
    category: "general",
    react: "👑",
    filename: __filename
},
async(conn, mek, m, { from, reply, myquoted }) => {
    try {
        const start = Date.now();
        
        // 1. Loading message
        const msg = await conn.sendMessage(from, { 
            text: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ ᴛᴇsᴛɪɴɢ ᴄᴏɴɴᴇᴄᴛɪᴏɴ...

✧══════════════════════✧
            `.trim()
        }, { quoted: myquoted });
        
        const end = Date.now();
        const latency = end - start;
        
        // 2. RAM Calculation
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
        const usedMem = (totalMem - freeMem).toFixed(0);

        // 3. Uptime Calculation
        const uptimeSeconds = process.uptime();
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);

        let uptimeStr = "";
        if (days) uptimeStr += `${days}ᴅ `;
        if (hours) uptimeStr += `${hours}ʜ `;
        if (minutes) uptimeStr += `${minutes}ᴍ `;
        if (seconds) uptimeStr += `${seconds}s`;

        // 4. Final Styled Message
        const pingMsg = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚡ ᴘɪɴɢ : ${latency} ᴍs
    ⏱ ᴜᴘᴛɪᴍᴇ : ${uptimeStr}
    💾 ʀᴀᴍ : ${usedMem}ᴍʙ / ${totalMem}ᴍʙ

✧══════════════════════✧
    👑 sʏsᴛᴇᴍ sᴛᴀᴛᴜs
✧══════════════════════✧
`;

        // 5. Edit the message
        await conn.sendMessage(from, { text: pingMsg, edit: msg.key });

    } catch (e) {
        console.error("UPTIME ERROR:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
        `.trim());
    }
});


// =================================================================
// 👑 OWNER COMMAND (Contact Card)
// =================================================================
cmd({
    pattern: "owner",
    alias: ["creator", "mod", "admin"],
    desc: "Contact the bot owner",
    category: "general",
    react: "👑",
    filename: __filename
},
async(conn, mek, m, { from, myquoted, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER || "923237045919";
        
        // Create vCard
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      'FN:PHANTOM-X Owner\n' +
                      'ORG:PHANTOM-X Corp;\n' +
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n` +
                      'END:VCARD';

        // Send contact card with styled message
        await conn.sendMessage(from, {
            contacts: {
                displayName: '👑 PHANTOM-X OWNER 👑',
                contacts: [{ vcard }]
            }
        }, { quoted: myquoted });

        // Send follow-up message
        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👑 ᴏᴡɴᴇʀ ᴄᴏɴᴛᴀᴄᴛ sᴇɴᴛ

    ғᴇᴇʟ ғʀᴇᴇ ᴛᴏ ʀᴇᴀᴄʜ ᴏᴜᴛ!

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
        `.trim());

    } catch (e) {
        console.error("OWNER ERROR:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ sᴇɴᴅɪɴɢ ᴄᴏɴᴛᴀᴄᴛ
✧══════════════════════✧
        `.trim());
    }
});