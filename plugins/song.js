const { cmd } = require("../phantom");
const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require("axios");
const { fakevCard } = require('../lib/fakevCard');

// ============================================================
// SONG COMMAND (YouTube MP3 Download)
// ============================================================
cmd({
pattern: "song",
alias: ["ytmp3", "play", "mp3", "gana", "music", "audio"],
react: "🎵",
desc: "YouTube search & MP3 play",
category: "download",
use: ".song <query>",
filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {

try {

const query = args.join(" ");
if (!query) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎵 sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .song <sᴏɴɢ ɴᴀᴍᴇ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .song ᴛᴀᴊᴅᴀʀ ᴇ ʜᴀʀᴀᴍ
✧══════════════════════✧
    `.trim());

await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

/* 🔍 YouTube Search */
const search = await yts(query);

if (!search.videos || !search.videos.length) {
return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ʀᴇsᴜʟᴛ ғᴏᴜɴᴅ
✧══════════════════════✧
    `.trim());
}

const video = search.videos[0];

/* 🎧 MP3 API */
const apiUrl = `https://arslan-apis-v2.vercel.app/download/ytmp4?url=${video.url}`;

const res = await axios.get(apiUrl, { timeout: 60000 });

if (
 !res.data ||
 !res.data.status ||
 !res.data.result ||
 !res.data.result.download ||
 !res.data.result.download.url
) {
 return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴀᴜᴅɪᴏ ɴᴏᴛ ɢᴇɴᴇʀᴀᴛᴇᴅ
✧══════════════════════✧
    `.trim());
}

const dlUrl = res.data.result.download.url;
const meta = res.data.result.metadata;
const quality = res.data.result.download.quality || "128kbps";

/* 🎵 SEND AUDIO */
await conn.sendMessage(from, {
audio: { url: dlUrl },
mimetype: "audio/mpeg",
ptt: false,
fileName: `${meta.title || "song"}.mp3`,
caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎵 ${meta.title || "Unknown Title"}
    🎚️ ϙᴜᴀʟɪᴛʏ : ${quality}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
`.trim(),
contextInfo: {
externalAdReply: {
title: meta.title
? meta.title.substring(0, 40)
: "YouTube Song",
body: "▶︎ •၊၊||၊|။||||။‌‌‌‌‌၊|• ★彡ᴘʜᴀɴᴛᴏᴍ-x-ʙᴇᴀᴛꜱ彡★",
thumbnailUrl: video.thumbnail,
sourceUrl: video.url,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: fakevCard });

await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

} catch (err) {

console.error("PLAY ERROR:", err);
reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴘʀᴏᴄᴇssɪɴɢ sᴏɴɢ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ

✧══════════════════════✧
    `.trim());

await conn.sendMessage(from, { react: { text: "❌", key: m.key } });

}

});


// ============================================================
// VIDEO COMMAND (YouTube MP4 Download)
// ============================================================
cmd({
  pattern: "video",
  alias: ["vid", "ytv", "ytmp4"],
  desc: "Download YouTube Video",
  category: "download",
  react: "🪄",
  filename: __filename
}, async (conn, mek, m, {
  from,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🪄 ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .video <ǫᴜᴇʀʏ ᴏʀ ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .video ᴘᴀsᴏᴏʀɪ
✧══════════════════════✧
      `.trim());
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    let videoUrl;
    if (q.includes("youtube.com") || q.includes('youtu.be')) {
      videoUrl = q;
    } else {
      let search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) {
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ʀᴇsᴜʟᴛ ғᴏᴜɴᴅ
✧══════════════════════✧
        `.trim());
      }
      videoUrl = search.videos[0].url;
    }

    let response = await fetch("https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(videoUrl));
    let data = await response.json();

    if (!data.status) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ᴠɪᴅᴇᴏ
✧══════════════════════✧
      `.trim());
    }

    let {
      video_url_hd,
      video_url_sd
    } = data.result.media;

    let downloadUrl = video_url_hd !== "No HD video URL available" ? video_url_hd : video_url_sd;

    if (!downloadUrl || downloadUrl.includes('No')) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ᴅᴏᴡɴʟᴏᴀᴅᴀʙʟᴇ ᴠɪᴅᴇᴏ ғᴏᴜɴᴅ
✧══════════════════════✧
      `.trim());
    }

    await conn.sendMessage(from, {
      video: { url: downloadUrl },
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🪄 ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    }, { quoted: fakevCard });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("VIDEO ERROR:", error);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ

✧══════════════════════✧
    `.trim());
    await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
  }
});