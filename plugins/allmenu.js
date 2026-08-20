const { cmd, commands } = require("../phantom");
const moment = require("moment-timezone");
const { fakevCard } = require('../lib/fakevCard');

cmd({
    pattern: "menu",
    alias: ["commandlist", "allmenu", "help"],
    desc: "Fetch and display all available bot commands",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        let totalCommands = 0;
        let grouped = {};

        // Group commands by category
        for (const cmd of commands) {
            if (!cmd.pattern || !cmd.category) continue;

            totalCommands++;
            if (!grouped[cmd.category]) grouped[cmd.category] = [];
            grouped[cmd.category].push(cmd.pattern);
        }

        let menuText = "";
        for (const cat in grouped) {
            menuText += `\n✧ ${cat.toUpperCase()} ✧\n`;
            menuText += grouped[cat].map(c => `  ✦ ${c}`).join("\n") + "\n";
        }

        const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
        const date = moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY");

        const caption = `
✧══════════════════════════════✧
        ✦ ᴘʜᴀɴᴛᴏᴍ-χ ᴍᴇɴᴜ ✦
✧══════════════════════════════✧

    📊 ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : ${totalCommands}
    🕐 ᴛɪᴍᴇ          : ${time}
    📅 ᴅᴀᴛᴇ          : ${date}

✧══════════════════════════════✧
${menuText}
✧══════════════════════════════✧

    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ ⚡
✧══════════════════════════════✧
`.trim();

        await conn.sendMessage(m.chat, {
            image: { url: "https://i.ibb.co/PsWdw53t/phantom-x.jpg" },
            caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: [m.sender],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363406476499117@newsletter",
                    newsletterName: "ᴘʜᴀɴᴛᴏᴍ-x",
                    serverMessageId: 2,
                },
            },
        }, { quoted: fakevCard });

    } catch (err) {
        console.error("AllMenu Error:", err);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴍᴇɴᴜ
✧══════════════════════✧
        `.trim());
    }
});