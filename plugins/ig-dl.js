const axios = require("axios");
const { cmd } = require('../phantom');
const { fakevCard } = require('../lib/fakevCard');

// ============================================================
// IGDL - Main Instagram Downloader
// ============================================================
cmd({
    pattern: "igdl",
    alias: ["instagram", "insta", "ig"],
    react: "⬇️",
    desc: "Download Instagram videos/reels",
    category: "downloader",
    use: ".igdl <Instagram URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
    try {
        const url = q || m.quoted?.text;
        if (!url || !url.includes("instagram.com")) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⬇️ ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .igdl <ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .igdl https://instagram.com/reel/...
✧══════════════════════✧
            `.trim());
        }

        // Show processing reaction
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Fetch from API
        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.data?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ᴍᴇᴅɪᴀ
    📝 ɪɴᴠᴀʟɪᴅ ʟɪɴᴋ ᴏʀ ᴘʀɪᴠᴀᴛᴇ
✧══════════════════════✧
            `.trim());
        }

        // Send all media items
        for (const item of response.data.data) {
            await conn.sendMessage(from, {
                [item.type === 'video' ? 'video' : 'image']: { url: item.url },
                caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⬇️ ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
                `.trim()
            }, { quoted: fakevCard });
        }

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('IGDL Error:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// IGDL4 - Alternative Instagram Downloader
// ============================================================
cmd({
  pattern: "igdl4",
  alias: ["instagram4", "insta4", "ig4", "igvideo4"],
  react: '📶',
  desc: "Download videos from Instagram (Alternative API)",
  category: "download",
  use: ".igdl4 <Instagram URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❮ ᴜsᴀɢᴇ ❯
    .igdl4 <ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .igdl4 https://instagram.com/reel/...
✧══════════════════════✧
      `.trim());
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://bk9.fun/download/instagram?url=${encodeURIComponent(igUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.status || !response.data?.BK9?.[0]?.url) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜɴᴀʙʟᴇ ᴛᴏ ғᴇᴛᴄʜ ᴠɪᴅᴇᴏ
    📝 ᴛʀʏ .igdl ғᴏʀ ᴘʀɪᴍᴀʀʏ
✧══════════════════════✧
      `.trim());
    }

    const videoUrl = response.data.BK9[0].url;
    await conn.sendMessage(from, { react: { text: '📶', key: m.key } });

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ
✧══════════════════════✧
      `.trim());
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📶 ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    }, { quoted: fakevCard });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading video:', error);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴀᴘɪ 2 ғᴀɪʟᴇᴅ
    📝 ᴛʀʏ .igdl ғᴏʀ ᴘʀɪᴍᴀʀʏ
✧══════════════════════✧
    `.trim());
  }
});

// ============================================================
// IGDL2 - Instagram Downloader (API v5)
// ============================================================
cmd({
  pattern: "igdl2",
  alias: ["instagram2", "ig2", "instadl2"],
  react: '📥',
  desc: "Download videos from Instagram (API v5)",
  category: "download",
  use: ".igdl2 <Instagram video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❮ ᴜsᴀɢᴇ ❯
    .igdl2 <ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .igdl2 https://instagram.com/reel/...
✧══════════════════════✧
      `.trim());
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(igUrl)}`;
    const response = await axios.get(apiUrl);

    const data = response.data;

    if (!data.status || !data.result || !Array.isArray(data.result)) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜɴᴀʙʟᴇ ᴛᴏ ғᴇᴛᴄʜ ᴠɪᴅᴇᴏ
✧══════════════════════✧
      `.trim());
    }

    const videoUrl = data.result[0];
    if (!videoUrl) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɴᴏ ᴠɪᴅᴇᴏ ғᴏᴜɴᴅ
✧══════════════════════✧
    `.trim());

    const metadata = data.metadata || {};
    const author = metadata.author || "Unknown";
    const caption = metadata.caption ? metadata.caption.slice(0, 300) + "..." : "No caption provided.";
    const likes = metadata.like || 0;
    const comments = metadata.comment || 0;

    await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⏳ ᴜᴘʟᴏᴀᴅɪɴɢ ᴠɪᴅᴇᴏ...
✧══════════════════════✧
    `.trim());

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📥 ɪɴsᴛᴀɢʀᴀᴍ ʀᴇᴇʟ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

    👤 ᴀᴜᴛʜᴏʀ : ${author}
    💬 ᴄᴀᴘᴛɪᴏɴ : ${caption}
    ❤️ ʟɪᴋᴇs : ${likes} • 💭 ᴄᴏᴍᴍᴇɴᴛs : ${comments}

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
      `.trim()
    }, { quoted: fakevCard });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('IGDL2 Error:', error);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ
    📝 ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ
✧══════════════════════✧
    `.trim());
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

// ============================================================
// IG3 - Instagram Downloader (Alternative)
// ============================================================
cmd({
    pattern: "ig3",
    alias: ["insta3", "instagram3"],
    desc: "Download Instagram video",
    category: "downloader",
    react: "⤵️",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⤵️ ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

    ❮ ᴜsᴀɢᴇ ❯
    .ig3 <ʟɪɴᴋ>

    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .ig3 https://instagram.com/reel/...
✧══════════════════════✧
        `.trim());
        
        if (!q.includes("instagram.com")) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɪɴᴠᴀʟɪᴅ ɪɴsᴛᴀɢʀᴀᴍ ʟɪɴᴋ
✧══════════════════════✧
        `.trim());
        
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const apiUrl = `https://rest-lily.vercel.app/api/downloader/igdl?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data || !data.data[0]) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ᴠɪᴅᴇᴏ
✧══════════════════════✧
        `.trim());
        
        const { url } = data.data[0];
        
        await conn.sendMessage(from, {
            video: { url: url },
            caption: `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⤵️ ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧
            `.trim(),
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: fakevCard });
        
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
    } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
        `.trim());
    }
});