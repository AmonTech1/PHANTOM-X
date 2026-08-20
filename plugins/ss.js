const { cmd } = require('../phantom');
const axios = require('axios');

cmd({
  pattern: "screenshot",
  alias: ["ss", "webshot", "sitepic"],
  react: "🖥️",
  category: "tools",
  desc: "Take full HD desktop screenshot of a website",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🖥️ ᴡᴇʙsɪᴛᴇ sᴄʀᴇᴇɴsʜᴏᴛ

    ᴛᴀᴋᴇ ᴀ ғᴜʟʟ ʜᴅ sᴄʀᴇᴇɴsʜᴏᴛ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .screenshot <ᴜʀʟ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .screenshot https://google.com
✧══════════════════════✧
      `.trim());
    }

    // Show loading message
    await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ ᴄᴀᴘᴛᴜʀɪɴɢ sᴄʀᴇᴇɴsʜᴏᴛ...
    🌐 ${q}

✧══════════════════════✧
    `.trim());

    // ✅ API call for full HD screenshot (1280x720)
    const apiUrl = `https://movanest.xyz/v2/ssweb?url=${encodeURIComponent(q)}&width=1280&height=720&full_page=true`;
    const res = await axios.get(apiUrl, { timeout: 60000 });

    if (!res.data || !res.data.status || !res.data.screenshot) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ sᴄʀᴇᴇɴsʜᴏᴛ ᴄᴀᴘᴛᴜʀᴇ ғᴀɪʟᴇᴅ
✧══════════════════════✧
      `.trim());
    }

    const screenshotUrl = res.data.screenshot;

    // ✅ Send screenshot
    await conn.sendMessage(from, {
      image: { url: screenshotUrl },
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🖥️ sᴄʀᴇᴇɴsʜᴏᴛ ᴄᴀᴘᴛᴜʀᴇᴅ
    🌐 ${q}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    }, { quoted: mek });

  } catch (err) {
    console.error("SCREENSHOT COMMAND ERROR:", err.message);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ sᴄʀᴇᴇɴsʜᴏᴛ ᴄᴀᴘᴛᴜʀᴇ ғᴀɪʟᴇᴅ
    📝 ᴀᴘɪ ʙᴜsʏ ᴏʀ ɪɴᴠᴀʟɪᴅ ᴜʀʟ

✧══════════════════════✧
    `.trim());
  }
});