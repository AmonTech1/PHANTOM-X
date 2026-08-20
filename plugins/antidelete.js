// plugins/antidelete.js
const { cmd } = require("../phantom");
const { updateUserConfigInMongoDB } = require('../lib/database');

cmd({
    pattern: "antidelete",
    alias: ["ad", "antidel"],
    desc: "Enable/Disable antidelete feature",
    category: "owner",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, {
    from,
    reply,
    args,
    sender,
    isCreator
}) => {
    try {
        if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        
        const action = args[0]?.toLowerCase();
        if (!action || !['on', 'off', 'enable', 'disable'].includes(action)) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🛡️ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴇᴛᴛɪɴɢs
    ⚡ sᴛᴀᴛᴜs : ${global.antideleteStatus || 'ON'}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .antidelete on
    .antidelete off
✧══════════════════════✧
    📩 ᴅᴇʟᴇᴛᴇᴅ ᴍsɢ ➜ ᴏᴡɴᴇʀ
✧══════════════════════✧
            `.trim());
        }
        
        const status = action === 'on' || action === 'enable' ? 'true' : 'false';
        
        const userNumber = sender.split('@')[0];
        await updateUserConfigInMongoDB(userNumber, { ANTIDELETE: status });
        
        global.antideleteStatus = status === 'true' ? 'ON' : 'OFF';
        
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🛡️ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ
    ✅ sᴛᴀᴛᴜs : ${status === 'true' ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}

✧══════════════════════✧
    📩 ᴅᴇʟᴇᴛᴇᴅ ᴍsɢ ➜ ᴏᴡɴᴇʀ
✧══════════════════════✧
        `.trim());
        
    } catch (error) {
        console.error("Antidelete command error:", error);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴜᴘᴅᴀᴛᴇ
✧══════════════════════✧
        `.trim());
    }
});

// Command to check antidelete status
cmd({
    pattern: "antidelstatus",
    alias: ["adstatus", "checkad"],
    desc: "Check antidelete status",
    category: "owner",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, {
    from,
    reply,
    sender,
    isCreator
}) => {
    try {
        if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        
        const userNumber = sender.split('@')[0];
        const config = await getUserConfigFromMongoDB(userNumber);
        const status = config.ANTIDELETE || 'true';
        
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📊 ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴛᴀᴛᴜs

    🛡️ sᴛᴀᴛᴜs : ${status === 'true' ? '✅ ᴇɴᴀʙʟᴇᴅ' : '❌ ᴅɪsᴀʙʟᴇᴅ'}
    📩 ᴅᴇʟɪᴠᴇʀʏ : ᴏᴡɴᴇʀ's ɪɴʙᴏx

✧══════════════════════✧
    ❮ ᴛᴏ ᴄʜᴀɴɢᴇ ❯
    .antidelete on/off
✧══════════════════════✧
        `.trim());
              
    } catch (error) {
        console.error("Status check error:", error);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴄʜᴇᴄᴋ sᴛᴀᴛᴜs
✧══════════════════════✧
        `.trim());
    }
});