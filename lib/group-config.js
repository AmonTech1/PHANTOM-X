// lib/groupEvents.js
// ═══════════════════════════════════════════════════════════════════════════
//  ✧══════════════════════════════════════════════════════════════════════✧
//     ✦ ɢʀᴏᴜᴘ ᴇᴠᴇɴᴛs ʜᴀɴᴅʟᴇʀ ✦
//  ✧══════════════════════════════════════════════════════════════════════✧
// ═══════════════════════════════════════════════════════════════════════════

const config = require('../config');

/**
 * Handles group participant events (add or remove).
 * @param {import('@whiskeysockets/baileys').WASocket} conn The Baileys socket connection.
 * @param {import('@whiskeysockets/baileys').GroupParticipantsUpdate} update The participant update object.
 */
async function groupEvents(conn, update) {
    // Configuration checks
    const isWelcomeEnabled = config.WELCOME_ENABLE === 'true'; 
    const isGoodbyeEnabled = config.GOODBYE_ENABLE === 'true'; 
    
    if (!isWelcomeEnabled && !isGoodbyeEnabled) return;

    try {
        const metadata = await conn.groupMetadata(update.id);
        const groupName = metadata.subject;
        const groupJid = update.id;
        const participants = update.participants;

        for (const participantJid of participants) {
            const username = `@${participantJid.split('@')[0]}`;
            
            // 1. WELCOME MESSAGE (ADD)
            if (update.action === 'add' && isWelcomeEnabled) {
                
                const defaultWelcomeMsg = 
`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🌟 ɴᴇᴡ ᴍᴇᴍʙᴇʀ ᴀʀʀɪᴠᴇᴅ!

    👋 ᴡᴇʟᴄᴏᴍᴇ : ${username}
    🏰 ɢʀᴏᴜᴘ : ${groupName}

✧══════════════════════✧
    📝 ᴘʟᴇᴀsᴇ ʀᴇᴀᴅ ᴛʜᴇ ʀᴜʟᴇs
✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;
                
                const welcomeText = config.WELCOME_MSG || defaultWelcomeMsg;

                const message = welcomeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);

                // Send welcome image if configured
                if (config.WELCOME_IMAGE && config.WELCOME_IMAGE.length > 5) {
                    await conn.sendMessage(groupJid, {
                        image: { url: config.WELCOME_IMAGE },
                        caption: message,
                        mentions: [participantJid]
                    });
                } else {
                    await conn.sendMessage(groupJid, { 
                        text: message, 
                        mentions: [participantJid] 
                    });
                }
            }
            
            // 2. GOODBYE MESSAGE (REMOVE)
            else if (update.action === 'remove' && isGoodbyeEnabled) {
                
                const defaultGoodbyeMsg = 
`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    😔 ᴍᴇᴍʙᴇʀ ʟᴇғᴛ ᴛʜᴇ ᴄʜᴀᴛ...

    👤 ɢᴏᴏᴅʙʏᴇ : ${username}
    📢 ᴍsɢ : ᴡᴇ ʜᴏᴘᴇ ᴛᴏ sᴇᴇ ʏᴏᴜ ᴀɢᴀɪɴ!

✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;
                
                const goodbyeText = config.GOODBYE_MSG || defaultGoodbyeMsg;

                const message = goodbyeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);
                
                // Send goodbye image if configured
                if (config.GOODBYE_IMAGE && config.GOODBYE_IMAGE.length > 5) {
                    await conn.sendMessage(groupJid, {
                        image: { url: config.GOODBYE_IMAGE },
                        caption: message,
                        mentions: [participantJid]
                    });
                } else {
                    await conn.sendMessage(groupJid, { 
                        text: message, 
                        mentions: [participantJid] 
                    });
                }
            }
        }
    } catch (e) {
        console.error("✧ GROUP EVENTS ERROR ✧", e.message);
    }
}

module.exports = {
    groupEvents
};