const { cmd } = require('../phantom')
const yts = require('yt-search')

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    react: "☺️",
    desc: "Search videos on YouTube",
    category: "search",
    use: ".yts <video name>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🔍 ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ

    sᴇᴀʀᴄʜ ғᴏʀ ᴠɪᴅᴇᴏs ᴏɴ ʏᴏᴜᴛᴜʙᴇ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .yts <ᴠɪᴅᴇᴏ ɴᴀᴍᴇ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .yts ᴛᴀᴊᴅᴀʀ ᴇ ʜᴀʀᴀᴍ
✧══════════════════════✧
            `.trim())
        }

        // Show loading message
        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ sᴇᴀʀᴄʜɪɴɢ ғᴏʀ: ${q}
    📺 ғᴇᴛᴄʜɪɴɢ ʀᴇsᴜʟᴛs...

✧══════════════════════✧
        `.trim())

        const search = await yts(q)
        const videos = search.videos.slice(0, 10) // top 10 results

        if (videos.length === 0) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ᴠɪᴅᴇᴏs ғᴏᴜɴᴅ
✧══════════════════════✧
            `.trim())
        }

        let text = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📺 ʏᴏᴜᴛᴜʙᴇ sᴇᴀʀᴄʜ ʀᴇsᴜʟᴛs
    🔍 ${q}

✧══════════════════════✧
`

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i]
            text += `
    ${i + 1}. ${v.title}
    ⏱️ ${v.timestamp} • 👁️ ${v.views} ᴠɪᴇᴡs
    🔗 ${v.url}
`
        }

        text += `
✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`

        await conn.sendMessage(
            from,
            { text },
            { quoted: mek }
        )

    } catch (e) {
        console.log("YTS ERROR:", e)
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ sᴇᴀʀᴄʜɪɴɢ ʏᴏᴜᴛᴜʙᴇ
✧══════════════════════✧
        `.trim())
    }
})