const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd } = require("../phantom");
const { fakevCard } = require('../lib/fakevCard');

// ============================================================
// 1. REQUEST LIST
// ============================================================
cmd({
    pattern: "requestlist",
    desc: "Shows pending group join requests",
    category: "group",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, participants }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
            `.trim());
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📋 ɴᴏ ᴘᴇɴᴅɪɴɢ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
            `.trim());
        }

        let text = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📋 ᴘᴇɴᴅɪɴɢ ʀᴇǫᴜᴇsᴛs (${requests.length})

✧══════════════════════✧
`;
        requests.forEach((user, i) => {
            text += `    ${i+1}. @${user.jid.split('@')[0]}\n`;
        });
        text += `
✧══════════════════════✧
`;

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        return reply(text, { mentions: requests.map(u => u.jid) });
    } catch (error) {
        console.error("Request list error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 2. ACCEPT ALL
// ============================================================
cmd({
    pattern: "acceptall",
    desc: "Accepts all pending group join requests",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
            `.trim());
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ℹ️ ɴᴏ ᴘᴇɴᴅɪɴɢ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
            `.trim());
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "approve");
        
        await conn.sendMessage(from, { react: { text: '👍', key: m.key } });
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴀᴄᴄᴇᴘᴛᴇᴅ ${requests.length} ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
        `.trim());
    } catch (error) {
        console.error("Accept all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴀᴄᴄᴇᴘᴛ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 3. REJECT ALL
// ============================================================
cmd({
    pattern: "rejectall",
    desc: "Rejects all pending group join requests",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
            `.trim());
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
            `.trim());
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ℹ️ ɴᴏ ᴘᴇɴᴅɪɴɢ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
            `.trim());
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "reject");
        
        await conn.sendMessage(from, { react: { text: '👎', key: m.key } });
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ʀᴇᴊᴇᴄᴛᴇᴅ ${requests.length} ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
        `.trim());
    } catch (error) {
        console.error("Reject all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴊᴇᴄᴛ ʀᴇǫᴜᴇsᴛs
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 4. KICK
// ============================================================
cmd({
    pattern: "kick",
    alias: ["remove","k"],
    desc: "Remove a group member",
    category: "admin",
    react: "🗑️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, mentionedJid, quoted }) => {
    try {
        if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
        `.trim());

        const target = quoted?.sender || mentionedJid?.[0];
        if (!target) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴍᴇɴᴛɪᴏɴ ᴏʀ ǫᴜᴏᴛᴇ ᴀ ᴜsᴇʀ
✧══════════════════════✧
        `.trim());

        await conn.groupParticipantsUpdate(from, [target], "remove");
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🗑️ @${target.split("@")[0]} ʀᴇᴍᴏᴠᴇᴅ
✧══════════════════════✧
        `.trim(), { mentions: [target] });

    } catch (error) {
        console.error("Kick error:", error);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴍᴏᴠᴇ ᴍᴇᴍʙᴇʀ
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 5. KICKALL
// ============================================================
cmd({
    pattern: "kickall",
    desc: "Remove all non-admin members",
    category: "admin",
    react: "⚠️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply, participants, groupMetadata }) => {
    try {
        if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
        `.trim());

        const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
        const botJid = conn.user.id.includes(':') ? conn.user.id.split(':')[0] + "@s.whatsapp.net" : conn.user.id;
        
        const toKick = participants.map(p => p.id).filter(id => !admins.includes(id) && id !== botJid);

        if (toKick.length === 0) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ɴᴏ ᴍᴇᴍʙᴇʀs ᴛᴏ ʀᴇᴍᴏᴠᴇ
✧══════════════════════✧
        `.trim());

        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ʀᴇᴍᴏᴠɪɴɢ ${toKick.length} ᴍᴇᴍʙᴇʀs...
✧══════════════════════✧
        `.trim());
        
        for (let user of toKick) {
            await conn.groupParticipantsUpdate(from, [user], "remove");
            await sleep(1000);
        }

        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴋɪᴄᴋᴀʟʟ ᴄᴏᴍᴘʟᴇᴛᴇᴅ
✧══════════════════════✧
        `.trim());

    } catch (err) {
        console.log(err);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴋɪᴄᴋᴀʟʟ ғᴀɪʟᴇᴅ
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 6. REMOVE ADMINS
// ============================================================
cmd({
    pattern: "removeadmins",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "Remove all admin members from the group",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, groupMetadata, groupAdmins, isBotAdmins, reply, isCreator
}) => {
    try {
        if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());
        if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
        `.trim());

        const botOwner = conn.user.id.split(":")[0];
        const allParticipants = groupMetadata.participants;
        const adminParticipants = allParticipants.filter(member => 
            groupAdmins.includes(member.id) && 
            member.id !== conn.user.id && 
            member.id !== `${botOwner}@s.whatsapp.net`
        );

        if (adminParticipants.length === 0) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ℹ️ ɴᴏ ᴀᴅᴍɪɴs ᴛᴏ ʀᴇᴍᴏᴠᴇ
✧══════════════════════✧
            `.trim());
        }

        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ʀᴇᴍᴏᴠɪɴɢ ${adminParticipants.length} ᴀᴅᴍɪɴs...
✧══════════════════════✧
        `.trim());

        for (let participant of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ᴀʟʟ ᴀᴅᴍɪɴs ʀᴇᴍᴏᴠᴇᴅ
✧══════════════════════✧
        `.trim());
    } catch (e) {
        console.error("Error removing admins:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ʀᴇᴍᴏᴠɪɴɢ ᴀᴅᴍɪɴs
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 7. PROMOTE
// ============================================================
cmd({
pattern: "promote",
alias: ["p", "giveadmin", "makeadmin"],
desc: "Promote a user to admin",
category: "group",
react: "👑",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
quoted,
reply,
mentionedJid,
isAdmins,
isBotAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
    `.trim());

    let users = [];  
    
    if (mentionedJid && mentionedJid.length > 0) {  
        users = mentionedJid;  
    } else if (quoted && quoted.sender) {  
        users = [quoted.sender];  
    } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {  
        users = m.message.extendedTextMessage.contextInfo.mentionedJid;  
    } else {  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴍᴇɴᴛɪᴏɴ ᴏʀ ǫᴜᴏᴛᴇ ᴀ ᴜsᴇʀ
    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .promote @ᴜsᴇʀ
✧══════════════════════✧
        `.trim());
    }  

    users = [...new Set(users.filter(user => user && user.includes('@')))];  
    if (users.length === 0) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ᴄᴏᴜʟᴅɴ'ᴛ ᴅᴇᴛᴇʀᴍɪɴᴇ ᴛᴀʀɢᴇᴛ
✧══════════════════════✧
    `.trim());

    try {  
        await conn.groupParticipantsUpdate(from, users, "promote");  
        
        if (users.length === 1) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👑 ᴘʀᴏᴍᴏᴛᴇᴅ @${users[0].split('@')[0]}
✧══════════════════════✧
            `.trim(), { mentions: users });  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👑 ᴘʀᴏᴍᴏᴛᴇᴅ ${users.length} ᴜsᴇʀs
✧══════════════════════✧
            `.trim(), { mentions: users });  
        }  
    } catch (promoteError) {  
        if (promoteError.message.includes("already")) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ ᴀɴ ᴀᴅᴍɪɴ
✧══════════════════════✧
            `.trim());  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴘʀᴏᴍᴏᴛᴇ
✧══════════════════════✧
            `.trim());  
        }  
    }

} catch (err) {
    console.error("Promote Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴘʀᴏᴍᴏᴛɪɴɢ ᴜsᴇʀ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 8. DEMOTE
// ============================================================
cmd({
pattern: "demote",
alias: ["d", "dismiss", "removeadmin"],
desc: "Demote a group admin",
category: "group",
react: "⬇️",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
quoted,
reply,
mentionedJid,
isAdmins,
isBotAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
    `.trim());

    let users = [];  
    
    if (mentionedJid && mentionedJid.length > 0) {  
        users = mentionedJid;  
    } else if (quoted && quoted.sender) {  
        users = [quoted.sender];  
    } else if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {  
        users = m.message.extendedTextMessage.contextInfo.mentionedJid;  
    } else {  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴍᴇɴᴛɪᴏɴ ᴏʀ ǫᴜᴏᴛᴇ ᴀɴ ᴀᴅᴍɪɴ
    ❮ ᴇxᴀᴍᴘʟᴇ ❯
    .demote @ᴀᴅᴍɪɴ
✧══════════════════════✧
        `.trim());
    }  

    users = [...new Set(users.filter(user => user && user.includes('@')))];  
    if (users.length === 0) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ᴄᴏᴜʟᴅɴ'ᴛ ᴅᴇᴛᴇʀᴍɪɴᴇ ᴛᴀʀɢᴇᴛ
✧══════════════════════✧
    `.trim());

    try {  
        await conn.groupParticipantsUpdate(from, users, "demote");  
        
        if (users.length === 1) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⬇️ ᴅᴇᴍᴏᴛᴇᴅ @${users[0].split('@')[0]}
✧══════════════════════✧
            `.trim(), { mentions: users });  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⬇️ ᴅᴇᴍᴏᴛᴇᴅ ${users.length} ᴀᴅᴍɪɴs
✧══════════════════════✧
            `.trim(), { mentions: users });  
        }  
    } catch (demoteError) {  
        if (demoteError.message.includes("not admin")) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ᴜsᴇʀ ɪs ɴᴏᴛ ᴀɴ ᴀᴅᴍɪɴ
✧══════════════════════✧
            `.trim());  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴇᴍᴏᴛᴇ
✧══════════════════════✧
            `.trim());  
        }  
    }

} catch (err) {
    console.error("Demote Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴅᴇᴍᴏᴛɪɴɢ ᴜsᴇʀ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 9. BOT ADMIN
// ============================================================
cmd({
pattern: "botadmin",
alias: ["makebotadmin", "giveadminbot", "adminbot"],
desc: "Make bot admin in group",
category: "group",
react: "🤖",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
isAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());

    try {  
        const groupMetadata = await conn.groupMetadata(from);  
        const botParticipant = groupMetadata.participants.find(p => p.id === conn.user.id);  
        if (botParticipant && botParticipant.admin) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ʙᴏᴛ ɪs ᴀʟʀᴇᴀᴅʏ ᴀᴅᴍɪɴ
✧══════════════════════✧
            `.trim());  
        }  
    } catch (e) {  
        console.log("Could not fetch group metadata, trying to promote bot...");  
    }  
    
    try {  
        await conn.groupParticipantsUpdate(from, [conn.user.id], "promote");  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ʙᴏᴛ ᴘʀᴏᴍᴏᴛᴇᴅ ᴛᴏ ᴀᴅᴍɪɴ

    ᴘᴏᴡᴇʀs ᴜɴʟᴏᴄᴋᴇᴅ:
    • .promote @ᴜsᴇʀ
    • .demote @ᴀᴅᴍɪɴ
    • .kick @ᴜsᴇʀ
✧══════════════════════✧
        `.trim());  
    } catch (err) {  
        if (err.message.includes("not authorized")) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴘʀᴏᴍᴏᴛᴇ ʙᴏᴛ

    ✳️ ᴍᴀɴᴜᴀʟ ᴍᴇᴛʜᴏᴅ:
    1. ɢʀᴏᴜᴘ sᴇᴛᴛɪɴɢs
    2. ᴘʀᴏᴍᴏᴛᴇ ʙᴏᴛ ᴍᴀɴᴜᴀʟʟʏ
✧══════════════════════✧
            `.trim());  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ: ${err.message}
✧══════════════════════✧
            `.trim());  
        }  
    }

} catch (err) {
    console.error("Bot Admin Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ɪɴ ʙᴏᴛᴀᴅᴍɪɴ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 10. ADD USER
// ============================================================
cmd({
pattern: "add",
alias: ["adduser", "addmember"],
desc: "Add user to group",
category: "group",
react: "➕",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
args = [],
mentionedJid,
text,
isAdmins,
isBotAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
    `.trim());

    let users = [];  
    
    if (mentionedJid && mentionedJid.length > 0) {  
        users = mentionedJid;  
    }  
    
    if (users.length === 0 && text) {  
        const textString = String(text || "").trim();  
        const directNumbers = textString.match(/\d{10,15}/g);  
        if (directNumbers) {  
            users = directNumbers.map(num => {  
                let cleanNum = num.replace(/\D/g, '');  
                if (cleanNum.startsWith('3')) {  
                    cleanNum = '92' + cleanNum;  
                }  
                if (cleanNum.length >= 10) {  
                    return cleanNum + '@s.whatsapp.net';  
                }  
                return null;  
            }).filter(Boolean);  
        }  
    }  
    
    if (users.length === 0) {  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴍᴇɴᴛɪᴏɴ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ɴᴜᴍʙᴇʀs

    ❮ ᴇxᴀᴍᴘʟᴇs ❯
    .add @ᴜsᴇʀ
    .add 923001234567
✧══════════════════════✧
        `.trim());  
    }  
    
    users = [...new Set(users)];  
    const validUsers = users.filter(user => {  
        const num = user.split('@')[0];  
        return num.length >= 10 && num.length <= 16;  
    });  
    
    if (validUsers.length === 0) {  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɪɴᴠᴀʟɪᴅ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀs
✧══════════════════════✧
        `.trim());  
    }  
    
    try {  
        await conn.groupParticipantsUpdate(from, validUsers, "add");  
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ${validUsers.length} ᴜsᴇʀ(s) ᴀᴅᴅᴇᴅ
✧══════════════════════✧
        `.trim());  
    } catch (addError) {  
        if (addError.message.includes("not in contacts")) {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴜsᴇʀs ɴᴏᴛ ɪɴ ᴄᴏɴᴛᴀᴄᴛs
    ᴀᴅᴅ ᴛʜᴇᴍ ғɪʀsᴛ
✧══════════════════════✧
            `.trim());  
        } else {  
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ: ${addError.message}
✧══════════════════════✧
            `.trim());  
        }  
    }

} catch (err) {
    console.error("Add Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴀᴅᴅ ᴜsᴇʀ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 11. TAG ALL
// ============================================================
cmd({
pattern: "tagall",
alias: ["gc_tagall", "mentionall"],
desc: "Tag all members",
category: "group",
react: "🔊",
filename: __filename
}, async (conn, mek, m, {
from,
participants,
reply,
isGroup,
body,
command,
isAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());

    let message = body.slice(body.indexOf(command) + command.length).trim();  
    if (!message) message = "Attention Everyone!";  
    
    let text = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🔊 ᴛᴀɢ ᴀʟʟ
    📝 ${message}

✧══════════════════════✧
`;  
    
    participants.forEach((member, i) => {  
        text += `    ${i+1}. @${member.id.split('@')[0]}\n`;  
    });  
    
    text += `
✧══════════════════════✧
    ✅ ᴛᴏᴛᴀʟ: ${participants.length} ᴍᴇᴍʙᴇʀs
✧══════════════════════✧`;  
    
    await conn.sendMessage(from, {  
        text: text,  
        mentions: participants.map(p => p.id)  
    }, { quoted: fakevCard });

} catch (err) {
    console.error("TagAll Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ɪɴ ᴛᴀɢᴀʟʟ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 12. HIDE TAG
// ============================================================
cmd({
  pattern: "hidetag",
  alias: ["tag", "h"],  
  react: "🔊",
  desc: "To Tag all Members for Any Message/Media",
  category: "group",
  use: '.hidetag Hello',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator, isAdmins,
  participants, reply
}) => {
  try {
    const isUrl = (url) => {
      return /https?:\/\/(www\.)?[\w\-@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w\-@:%_\+.~#?&//=]*)/.test(url);
    };

    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isAdmins && !isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴀᴅᴍɪɴ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());

    const mentionAll = { mentions: participants.map(u => u.id) };

    if (!q && !m.quoted) {
      return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❓ ᴘʀᴏᴠɪᴅᴇ ᴍᴇssᴀɢᴇ ᴏʀ ǫᴜᴏᴛᴇ
    ❮ ᴜsᴀɢᴇ ❯
    .hidetag <ᴛᴇxᴛ>
✧══════════════════════✧
      `.trim());
    }

    if (m.quoted) {
      const type = m.quoted.mtype || '';
      
      if (type === 'extendedTextMessage') {
        return await conn.sendMessage(from, {
          text: m.quoted.text || 'No message content found.',
          ...mentionAll
        }, { quoted: mek });
      }

      if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
        try {
          const buffer = await m.quoted.download?.();
          if (!buffer) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ
✧══════════════════════✧
          `.trim());

          let content;
          switch (type) {
            case "imageMessage":
              content = { image: buffer, caption: m.quoted.text || "📷 Image", ...mentionAll };
              break;
            case "videoMessage":
              content = { 
                video: buffer, 
                caption: m.quoted.text || "🎥 Video", 
                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false, 
                ...mentionAll 
              };
              break;
            case "audioMessage":
              content = { 
                audio: buffer, 
                mimetype: "audio/mp4", 
                ptt: m.quoted.message?.audioMessage?.ptt || false, 
                ...mentionAll 
              };
              break;
            case "stickerMessage":
              content = { sticker: buffer, ...mentionAll };
              break;
            case "documentMessage":
              content = {
                document: buffer,
                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                fileName: m.quoted.message?.documentMessage?.fileName || "file",
                caption: m.quoted.text || "",
                ...mentionAll
              };
              break;
          }

          if (content) {
            return await conn.sendMessage(from, content, { quoted: fakevCard });
          }
        } catch (e) {
          console.error("Media download/send error:", e);
          return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴘʀᴏᴄᴇss ᴍᴇᴅɪᴀ
✧══════════════════════✧
          `.trim());
        }
      }

      return await conn.sendMessage(from, {
        text: m.quoted.text || "📨 Message",
        ...mentionAll
      }, { quoted: fakevCard });
    }

    if (q) {
      if (isUrl(q)) {
        return await conn.sendMessage(from, {
          text: q,
          ...mentionAll
        }, { quoted: fakevCard });
      }

      await conn.sendMessage(from, {
        text: q,
        ...mentionAll
      }, { quoted: fakevCard });
    }

  } catch (e) {
    console.error(e);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
    `.trim());
  }
});

// ============================================================
// 13. ADMIN CHECK
// ============================================================
cmd({
pattern: "admincheck",
alias: ["checkadmin", "admintest"],
desc: "Check admin status",
category: "group",
react: "🔍",
filename: __filename
}, async (conn, mek, m, {
from,
isGroup,
reply,
sender,
isCreator,
participants,
isAdmins,
isBotAdmins
}) => {
try {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());

    let message = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👑 ᴀᴅᴍɪɴ sᴛᴀᴛᴜs ᴄʜᴇᴄᴋ

    👤 ʏᴏᴜ : @${sender.split('@')[0]}
    🤖 ᴏᴡɴᴇʀ : ${isCreator ? '✅ YES' : '❌ NO'}
    👑 ᴀᴅᴍɪɴ : ${isAdmins ? '✅ YES' : '❌ NO'}
    🤖 ʙᴏᴛ ᴀᴅᴍɪɴ : ${isBotAdmins ? '✅ YES' : '❌ NO'}

✧══════════════════════✧
`;  
    
    try {  
        const groupMetadata = await conn.groupMetadata(from);  
        message += `
    👥 ᴛᴏᴛᴀʟ : ${groupMetadata.participants.length} ᴍᴇᴍʙᴇʀs
`;  
        
        if (!isBotAdmins) {  
            message += `
    ⚠️ ʙᴏᴛ ɴᴏᴛ ᴀᴅᴍɪɴ
    ᴜsᴇ: .botadmin
✧══════════════════════✧`;  
        } else {  
            message += `
    ✅ ʙᴏᴛ ɪs ᴀᴅᴍɪɴ
    ᴘᴏᴡᴇʀs ᴀᴠᴀɪʟᴀʙʟᴇ
✧══════════════════════✧`;  
        }  
    } catch (metadataError) {  
        message += `
    ❌ ᴄᴀɴɴᴏᴛ ғᴇᴛᴄʜ ᴅᴇᴛᴀɪʟs
✧══════════════════════✧`;  
    }  
    
    await conn.sendMessage(from, {  
        text: message,  
        mentions: [sender]  
    }, { quoted: mek });

} catch (err) {
    console.error("Admin Check Error:", err);
    reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ ᴄʜᴇᴄᴋɪɴɢ ᴀᴅᴍɪɴ
✧══════════════════════✧
    `.trim());
}
});

// ============================================================
// 14. END (KICK ALL)
// ============================================================
cmd({
    pattern: "end",
    alias: ["byeall", "kickall", "endgc"],
    desc: "Removes all members (including admins) from the group",
    category: "admin",
    react: "⚠️",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isBotAdmins, reply, groupMetadata, isCreator
}) => {
    if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    if (!isBotAdmins) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ʙᴏᴛ ɴᴇᴇᴅs ᴀᴅᴍɪɴ ʀɪɢʜᴛs
✧══════════════════════✧
    `.trim());

    try {
        const ignoreJids = [
            "923237045919@s.whatsapp.net",
            "923237045919@s.whatsapp.net"
        ];

        const participants = groupMetadata.participants || [];
        const targets = participants.filter(p => !ignoreJids.includes(p.id));
        const jids = targets.map(p => p.id);

        if (jids.length === 0) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ɴᴏ ᴍᴇᴍʙᴇʀs ᴛᴏ ʀᴇᴍᴏᴠᴇ
✧══════════════════════✧
        `.trim());

        await conn.groupParticipantsUpdate(from, jids, "remove");
        return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ✅ ʀᴇᴍᴏᴠᴇᴅ ${jids.length} ᴍᴇᴍʙᴇʀs
✧══════════════════════✧
        `.trim());
    } catch (error) {
        console.error("End command error:", error);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴍᴏᴠᴇ ᴍᴇᴍʙᴇʀs
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 15. LEAVE
// ============================================================
cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isCreator, reply
}) => {
    try {
        if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());

        if (!isCreator) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());

        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👋 ɢᴏᴏᴅʙʏᴇ ᴇᴠᴇʀʏᴏɴᴇ!
    ᴛʜᴀɴᴋs ғᴏʀ ʜᴀᴠɪɴɢ ᴍᴇ ❤️
✧══════════════════════✧
        `.trim());

        await sleep(1500);
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
        `.trim());
    }
});