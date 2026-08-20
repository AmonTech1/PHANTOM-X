const { cmd } = require('../phantom');
const config = require('../config');

cmd({
    pattern: "anti-call",
    react: "👑",
    alias: ["anticall"],
    desc: "Enable or disable anti-call feature",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());

    const status = args[0]?.toLowerCase();
    
    if (status === "on" || status === "true") {
        config.ANTI_CALL = "true";
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📞 ᴀɴᴛɪ-ᴄᴀʟʟ
    ✅ sᴛᴀᴛᴜs : ᴀᴄᴛɪᴠᴀᴛᴇᴅ

✧══════════════════════✧
    ⚡ ᴄᴀʟʟs ᴡɪʟʟ ʙᴇ ʀᴇᴊᴇᴄᴛᴇᴅ
✧══════════════════════✧
        `.trim());
    } else if (status === "off" || status === "false") {
        config.ANTI_CALL = "false";
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📞 ᴀɴᴛɪ-ᴄᴀʟʟ
    ❌ sᴛᴀᴛᴜs : ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇᴅ

✧══════════════════════✧
    ⚡ ᴄᴀʟʟs ᴡɪʟʟ ɴᴏᴛ ʙᴇ ʀᴇᴊᴇᴄᴛᴇᴅ
✧══════════════════════✧
        `.trim());
    } else {
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📞 ᴀɴᴛɪ-ᴄᴀʟʟ sᴇᴛᴛɪɴɢs
    ⚡ ᴄᴜʀʀᴇɴᴛ : ${config.ANTI_CALL}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .anti-call on
    .anti-call off
✧══════════════════════✧
        `.trim());
    }
});