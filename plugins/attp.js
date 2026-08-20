const { cmd } = require('../phantom')
const { fetchGif, gifToSticker } = require('../lib/sticker-utils')

cmd({
    pattern: "attp",
    alias: ["attptext", "textsticker", "namesticker", "stickername", "at", "att", "atp"],
    react: "✨",
    desc: "Convert text into animated sticker",
    category: "sticker",
    use: ".attp <text>",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✨ ᴀɴɪᴍᴀᴛᴇᴅ ᴛᴇxᴛ sᴛɪᴄᴋᴇʀ

    ᴍᴀᴋᴇ ᴀ sᴛɪᴄᴋᴇʀ ᴡɪᴛʜ ʏᴏᴜʀ ɴᴀᴍᴇ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .attp <ʏᴏᴜʀ ᴛᴇxᴛ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .attp ᴘʜᴀɴᴛᴏᴍ
✧══════════════════════✧
            `.trim())
        }

        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✨ ᴄʀᴇᴀᴛɪɴɢ sᴛɪᴄᴋᴇʀ
    ⏳ ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...

✧══════════════════════✧
        `.trim())

        const text = encodeURIComponent(args.join(" "))
        const gifBuffer = await fetchGif(
            `https://api-fix.onrender.com/api/maker/attp?text=${text}`
        )

        const sticker = await gifToSticker(gifBuffer)

        await conn.sendMessage(
            m.chat,
            { sticker },
            { quoted: mek }
        )

    } catch (e) {
        console.log("ATTP ERROR:", e)
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴄʀᴇᴀᴛɪɴɢ sᴛɪᴄᴋᴇʀ
✧══════════════════════✧
        `.trim())
    }
})