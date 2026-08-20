const { cmd } = require('../phantom')

cmd({
    pattern: "vv",
    alias: ["viewonce", "view", "open"],
    react: "🥺",
    desc: "Retrieve view-once media (Owner only)",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());

        if (!m.quoted) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🥺 ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴍᴇᴅɪᴀ

    ❮ ᴜsᴀɢᴇ ❯
    .vv (ʀᴇᴘʟʏ ᴛᴏ ᴠɪᴇᴡ-ᴏɴᴄᴇ)

    ❮ sᴜᴘᴘᴏʀᴛs ❯
    📸 ᴘʜᴏᴛᴏ • 🎥 ᴠɪᴅᴇᴏ • 🎵 ᴀᴜᴅɪᴏ
✧══════════════════════✧
        `.trim());

        // 🔥 VIEW ONCE FIX
        let quoted = m.quoted
        let msg = quoted.message

        if (msg?.viewOnceMessageV2) {
            msg = msg.viewOnceMessageV2.message
        } else if (msg?.viewOnceMessageV2Extension) {
            msg = msg.viewOnceMessageV2Extension.message
        }

        const type = Object.keys(msg)[0]
        const buffer = await quoted.download()

        let content = {}
        let mediaType = ""

        if (type === "imageMessage") {
            content = {
                image: buffer,
                caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📸 ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴘʜᴏᴛᴏ

    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
                `.trim()
            }
            mediaType = "Photo"
        } 
        else if (type === "videoMessage") {
            content = {
                video: buffer,
                caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎥 ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴠɪᴅᴇᴏ

    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
                `.trim()
            }
            mediaType = "Video"
        } 
        else if (type === "audioMessage") {
            content = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: false
            }
            mediaType = "Audio"
        } 
        else {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜɴsᴜᴘᴘᴏʀᴛᴇᴅ ᴍᴇᴅɪᴀ ᴛʏᴘᴇ
✧══════════════════════✧
            `.trim());
        }

        await conn.sendMessage(from, content, { quoted: mek });

        // Success reaction
        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

    } catch (e) {
        console.log("VV ERROR:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴏᴘᴇɴɪɴɢ ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴍᴇᴅɪᴀ
✧══════════════════════✧
        `.trim());
    }
})