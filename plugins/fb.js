const { cmd } = require('../phantom');
const axios = require('axios');

cmd({
  pattern: "fb",
  react: "☺️",
  alias: ["facebook", "fbdl"],
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📱 ғᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

    ᴅᴏᴡɴʟᴏᴀᴅ ғᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏs

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .fb <ᴠɪᴅᴇᴏ ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .fb https://facebook.com/video/...
✧══════════════════════✧
    `.trim());

    // Show loading message
    await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ ᴘʀᴏᴄᴇssɪɴɢ ᴠɪᴅᴇᴏ...
    📱 ғᴇᴛᴄʜɪɴɢ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ...

✧══════════════════════✧
    `.trim());

    const apiUrl = `https://movanest.xyz/v2/fbdown?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    // 🔎 API status check
    if (data.status !== true) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴀᴘɪ ᴇʀʀᴏʀ
    📝 ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ

✧══════════════════════✧
      `.trim());
    }

    // 🔎 Results check
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴠɪᴅᴇᴏ ɴᴏᴛ ғᴏᴜɴᴅ
    📝 ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ʟɪɴᴋ

✧══════════════════════✧
      `.trim());
    }

    const result = data.results[0];

    // 🎥 Quality selection (according to API)
    const videoUrl = result.hdQualityLink
      ? result.hdQualityLink
      : result.normalQualityLink;

    if (!videoUrl) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ɴᴏᴛ ғᴏᴜɴᴅ
    📝 ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ᴠɪᴅᴇᴏ ʟɪɴᴋ

✧══════════════════════✧
      `.trim());
    }

    // 📝 Caption from API data
    const caption = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📱 ғᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏ

    ⏱️ ᴅᴜʀᴀᴛɪᴏɴ : ${result.duration || 'ɴ/ᴀ'}
    👤 ᴄʀᴇᴀᴛᴏʀ : ${data.creator || 'ᴜɴᴋɴᴏᴡɴ'}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;

    await conn.sendMessage(
      from,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.log("FB ERROR:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ

✧══════════════════════✧
    `.trim());
  }
});