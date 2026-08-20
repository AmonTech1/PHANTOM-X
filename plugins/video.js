const axios = require('axios')
const yts = require('yt-search')
const { cmd } = require('../phantom')
const { fakevCard } = require('../lib/fakevCard')

cmd({
pattern: "video",
alias: ["vid", "playvideo"],
desc: "Download YouTube Video (Fast)",
category: "download",
react: "🎬",
filename: __filename
},
async (conn, mek, m, { from, reply, text }) => {

try {

if (!text) {
return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎬 ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .video <ǫᴜᴇʀʏ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .video ᴘᴀsᴏᴏʀɪ
✧══════════════════════✧
    `.trim())
}

/* 🔍 Search */
const search = await yts(text)

if (!search.videos.length) {
return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ᴠɪᴅᴇᴏ ғᴏᴜɴᴅ
✧══════════════════════✧
    `.trim())
}

const vid = search.videos[0]

/* 🎨 Preview */
const caption = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎬 ᴠɪᴅᴇᴏ ғᴏᴜɴᴅ

    📌 ᴛɪᴛʟᴇ : ${vid.title}
    ⏱️ ᴅᴜʀᴀᴛɪᴏɴ : ${vid.timestamp}

✧══════════════════════✧
    ⚡ sᴇɴᴅɪɴɢ ᴠɪᴅᴇᴏ...
✧══════════════════════✧
`

await conn.sendMessage(from,{
image:{url:vid.thumbnail},
caption
},{quoted:fakevCard})

/* 🎥 API */
const api = `https://arslan-apis-v2.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`

const res = await axios.get(api,{timeout:60000})

if(
!res.data ||
!res.data.status ||
!res.data.result ||
!res.data.result.download ||
!res.data.result.download.url
){
return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴠɪᴅᴇᴏ ᴀᴘɪ ғᴀɪʟᴇᴅ
✧══════════════════════✧
    `.trim())
}

const videoUrl = res.data.result.download.url
const title = res.data.result.metadata.title || vid.title

/* 🚀 SEND VIDEO DIRECT */
await conn.sendMessage(from,{
video:{url:videoUrl},
mimetype:"video/mp4",
caption:`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎬 ${title}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
`.trim()
},{quoted:fakevCard})

}catch(err){

console.log("VIDEO ERROR:", err)
reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴇʀʀᴏʀ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ

✧══════════════════════✧
    `.trim())
}

})