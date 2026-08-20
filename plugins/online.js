const { cmd } = require('../phantom');

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ɢʀᴏᴜᴘ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
        `.trim());

        // Check if user is either creator or admin
        if (!isCreator && !isAdmins && !fromMe) {
            return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ & ᴀᴅᴍɪɴ ᴏɴʟʏ
✧══════════════════════✧
            `.trim());
        }

        // Inform user that we're checking
        await reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🟢 ᴄʜᴇᴄᴋɪɴɢ ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀs
    ⏳ ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...

✧══════════════════════✧
        `.trim());

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        const presencePromises = [];

        // Request presence updates for all participants
        for (const participant of groupData.participants) {
            presencePromises.push(
                conn.presenceSubscribe(participant.id)
                    .then(() => {
                        return conn.sendPresenceUpdate('composing', participant.id);
                    })
            );
        }

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            for (const id in json.presences) {
                const presence = json.presences[id]?.lastKnownPresence;
                if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                    onlineMembers.add(id);
                }
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Longer timeout and multiple checks
        const checks = 3;
        const checkInterval = 5000;
        let checksDone = 0;

        const checkOnline = async () => {
            checksDone++;
            
            if (checksDone >= checks) {
                clearInterval(interval);
                conn.ev.off('presence.update', presenceHandler);
                
                if (onlineMembers.size === 0) {
                    return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚠️ ɴᴏ ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀs ᴅᴇᴛᴇᴄᴛᴇᴅ
✧══════════════════════✧
                    `.trim());
                }
                
                const onlineArray = Array.from(onlineMembers);
                let message = `
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🟢 ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀs
    📊 ${onlineArray.length}/${groupData.participants.length}

✧══════════════════════✧
`;
                onlineArray.forEach((member, index) => {
                    message += `    ${index + 1}. @${member.split('@')[0]}\n`;
                });
                message += `
✧══════════════════════✧
    ⚡ ᴘʜᴀɴᴛᴏᴍ-χ ɪs ᴀʟɪᴠᴇ
✧══════════════════════✧`;
                
                await conn.sendMessage(from, { 
                    text: message,
                    mentions: onlineArray
                }, { quoted: mek });
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴇʀʀᴏʀ: ${e.message}
✧══════════════════════✧
        `.trim());
    }
});