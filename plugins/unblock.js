const { cmd } = require('../phantom');

cmd({
  pattern: "unblock",
  alias: ["unb", "unblk", "unblok"],
  react: "🥰",
  category: "owner",
  desc: "Unblock user (reply or inbox)",
  filename: __filename
}, async (conn, mek, m, { from, reply, isOwner }) => {
  try {

    // 🔒 Owner only
    if (!isOwner) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
      `.trim());
    }

    let jid;

    // 📌 Reply case
    if (m.quoted) {
      jid = m.quoted.sender;
    }
    // 📌 Inbox case
    else if (from.endsWith("@s.whatsapp.net")) {
      jid = from;
    } 
    else {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴛᴏ ᴜɴʙʟᴏᴄᴋ sᴏᴍᴇᴏɴᴇ

    ❮ ᴏᴘᴛɪᴏɴs ❯
    • ʀᴇᴘʟʏ ᴛᴏ ᴛʜᴇɪʀ ᴍᴇssᴀɢᴇ
    • ᴜsᴇ ɪɴ ᴘʀɪᴠᴀᴛᴇ ɪɴʙᴏx

✧══════════════════════✧
      `.trim());
    }

    await conn.updateBlockStatus(jid, "unblock");

    await conn.sendMessage(from, {
      react: { text: "🥰", key: mek.key }
    });

    return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🥰 ᴜɴʙʟᴏᴄᴋᴇᴅ @${jid.split('@')[0]}

✧══════════════════════✧
    `.trim(), { mentions: [jid] });

  } catch (e) {
    console.log("UNBLOCK ERROR:", e);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴜɴʙʟᴏᴄᴋ ᴜsᴇʀ
✧══════════════════════✧
    `.trim());
  }
});