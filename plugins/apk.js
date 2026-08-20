const { cmd } = require('../phantom');
const axios = require('axios');

cmd({
  pattern: "apk",
  alias: ["app", "playstore", "application"],
  react: "☺️",
  desc: "Download APK via Aptoide",
  category: "download",
  use: ".apk <name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📱 ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

    ᴅᴏᴡɴʟᴏᴀᴅ ᴀɴʏ ᴀᴘᴘ ғʀᴏᴍ ᴀᴘᴛᴏɪᴅᴇ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .apk <ᴀᴘᴘ ɴᴀᴍᴇ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .apk ᴡʜᴀᴛsᴀᴘᴘ
✧══════════════════════✧
    `.trim());

    // Show loading message
    await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ sᴇᴀʀᴄʜɪɴɢ ғᴏʀ: ${q}
    📱 ғᴇᴛᴄʜɪɴɢ ᴀᴘᴋ...

✧══════════════════════✧
    `.trim());

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴀᴘᴋ ɴᴏᴛ ғᴏᴜɴᴅ
✧══════════════════════✧
      `.trim());
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    let caption = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📱 ᴀᴘᴋ ɪɴғᴏʀᴍᴀᴛɪᴏɴ

    👑 ɴᴀᴍᴇ : ${app.name.toUpperCase()}
    📦 sɪᴢᴇ : ${appSize} MB
    📦 ᴘᴀᴄᴋ : ${app.package.toUpperCase()}
    🔢 ᴠᴇʀsɪᴏɴ : ${app.file.vername}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;

    // Send app icon
    await conn.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });

    // Send APK file
    await conn.sendMessage(from, {
      document: { url: app.file.path || app.file.path_alt },
      mimetype: "application/vnd.android.package-archive",
      fileName: `${app.name.toUpperCase()}.apk`
    }, { quoted: mek });

    // Success reaction
    await m.react("✅");

  } catch (err) {
    console.error("APK ERROR:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴀᴘᴋ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ

✧══════════════════════✧
    `.trim());
  }
});