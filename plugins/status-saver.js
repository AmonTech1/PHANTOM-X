const { cmd } = require("../phantom");

cmd({
  on: "body",
  react: "📤",
  filename: __filename
}, async (client, mek, m, { body, sender, from, reply }) => {

  if (from !== "status@broadcast") return;

  const text = (body || "").toLowerCase().trim();
  if (!["send", "sendme", "save", "forward"].includes(text)) return;

  const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted) {
    return await client.sendMessage(sender, {
      text: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ᴍᴇᴅɪᴀ ғᴏᴜɴᴅ
    ᴘʟᴇᴀsᴇ ǫᴜᴏᴛᴇ ᴀ sᴛᴀᴛᴜs

✧══════════════════════✧
      `.trim()
    });
  }

  let msg = {};
  let type = "";

  if (quoted.imageMessage) {
    msg = { 
      image: { url: quoted.imageMessage.url },
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📸 sᴛᴀᴛᴜs sᴀᴠᴇᴅ

    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    };
    type = "Image";
  } 
  else if (quoted.videoMessage) {
    msg = { 
      video: { url: quoted.videoMessage.url },
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🎥 sᴛᴀᴛᴜs sᴀᴠᴇᴅ

    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    };
    type = "Video";
  }
  else if (quoted.audioMessage) {
    msg = { 
      audio: { url: quoted.audioMessage.url },
      mimetype: "audio/mp4",
      ptt: false
    };
    type = "Audio";
  }
  else if (quoted.stickerMessage) {
    msg = { 
      sticker: { url: quoted.stickerMessage.url }
    };
    type = "Sticker";
  }
  else {
    return await client.sendMessage(sender, {
      text: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜɴsᴜᴘᴘᴏʀᴛᴇᴅ ᴍᴇᴅɪᴀ ᴛʏᴘᴇ
✧══════════════════════✧
      `.trim()
    });
  }

  try {
    await client.sendMessage(sender, msg);
    
    // Reply with success status
    await client.sendMessage(sender, {
      text: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ${type} sᴛᴀᴛᴜs sᴀᴠᴇᴅ
    📤 sᴇɴᴛ ᴛᴏ ʏᴏᴜʀ ɪɴʙᴏx

✧══════════════════════✧
      `.trim()
    });
  } catch (e) {
    console.error("Status Save Error:", e);
    await client.sendMessage(sender, {
      text: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ sᴀᴠᴇ sᴛᴀᴛᴜs
✧══════════════════════✧
      `.trim()
    });
  }
});