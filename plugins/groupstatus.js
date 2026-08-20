const { cmd } = require("../phantom");

cmd({
    pattern: "groupstatus",
    alias: ["gstatus", "poststatus", "statuspost"],
    desc: "Post text or media to WhatsApp Status",
    category: "group",
    react: "📡",
    filename: __filename
},
async (conn, mek, m, { body, reply, pushname }) => {
    try {

        const caption = body.split(" ").slice(1).join(" ");

        // TEXT STATUS
        if (!m.quoted && caption) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    text:
`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👤 ᴜsᴇʀ : ${pushname}
    🕒 ᴛɪᴍᴇ : ${new Date().toLocaleString()}

    💬 ᴍᴇssᴀɢᴇ:
    ${caption}

✧══════════════════════✧
    ⚡ sᴛᴀᴛᴜs ᴜᴘᴅᴀᴛᴇ
✧══════════════════════✧`
                }
            );

            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴛᴇxᴛ sᴛᴀᴛᴜs ᴘᴏsᴛᴇᴅ
✧══════════════════════✧
            `.trim());
        }

        if (!m.quoted) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ʀᴇᴘʟʏ ᴛᴏ ᴍᴇᴅɪᴀ ᴏʀ ᴛᴇxᴛ

    ❮ ᴜsᴀɢᴇ ❯
    .groupstatus <ᴛᴇxᴛ>
    .groupstatus (ʀᴇᴘʟʏ ᴛᴏ ᴍᴇᴅɪᴀ)

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .groupstatus ʜᴇʟʟᴏ ᴇᴠᴇʀʏᴏɴᴇ
✧══════════════════════✧
            `.trim());
        }

        const quoted = m.quoted;
        const media = await quoted.download();

        // IMAGE
        if (quoted.imageMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    image: media,
                    caption:
`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📸 sᴛᴀᴛᴜs ᴜᴘᴅᴀᴛᴇ

    👤 ᴘᴏsᴛᴇᴅ ʙʏ : ${pushname}
    🕒 ᴛɪᴍᴇ : ${new Date().toLocaleString()}

    📝 ${caption || "ɴᴏ ᴄᴀᴘᴛɪᴏɴ"}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`
                }
            );

            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ɪᴍᴀɢᴇ sᴛᴀᴛᴜs ᴘᴏsᴛᴇᴅ
✧══════════════════════✧
            `.trim());
        }

        // VIDEO
        if (quoted.videoMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    video: media,
                    caption:
`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎥 sᴛᴀᴛᴜs ᴜᴘᴅᴀᴛᴇ

    👤 ᴘᴏsᴛᴇᴅ ʙʏ : ${pushname}
    🕒 ᴛɪᴍᴇ : ${new Date().toLocaleString()}

    📝 ${caption || "ɴᴏ ᴄᴀᴘᴛɪᴏɴ"}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`
                }
            );

            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴠɪᴅᴇᴏ sᴛᴀᴛᴜs ᴘᴏsᴛᴇᴅ
✧══════════════════════✧
            `.trim());
        }

        // AUDIO
        if (quoted.audioMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    audio: media,
                    mimetype: "audio/mp4",
                    ptt: false
                }
            );

            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴀᴜᴅɪᴏ sᴛᴀᴛᴜs ᴘᴏsᴛᴇᴅ
✧══════════════════════✧
            `.trim());
        }

        // STICKER
        if (quoted.stickerMessage) {

            await conn.sendMessage(
                "status@broadcast",
                {
                    sticker: media
                }
            );

            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ sᴛɪᴄᴋᴇʀ sᴛᴀᴛᴜs ᴘᴏsᴛᴇᴅ
✧══════════════════════✧
            `.trim());
        }

        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜɴsᴜᴘᴘᴏʀᴛᴇᴅ ᴍᴇᴅɪᴀ ᴛʏᴘᴇ
✧══════════════════════✧
        `.trim());

    } catch (err) {
        console.log("GROUPSTATUS ERROR:", err);

        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ sᴛᴀᴛᴜs ᴇʀʀᴏʀ
    📝 ${err.message}

✧══════════════════════✧
        `.trim());
    }
});