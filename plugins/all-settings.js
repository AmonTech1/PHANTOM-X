const { cmd } = require('../phantom');
const { updateUserConfig } = require('../lib/database');

// Helper function to update config in memory and database
const updateConfig = async (key, value, botNumber, config, reply) => {
    try {
        config[key] = value;
        const newConfig = { ...config };
        newConfig[key] = value;
        await updateUserConfig(botNumber, newConfig);
        return reply(`✅ *${key}* has been updated to: *${value}*`);
    } catch (e) {
        console.error(e);
        return reply("❌ Error while saving to database.");
    }
};

// ============================================================
// 1. PRESENCE MANAGEMENT
// ============================================================

cmd({
    pattern: "autorecording",
    alias: ["autorec", "arecording"],
    desc: "Enable/Disable auto recording simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_RECORDING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_RECORDING', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📝 ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ
    ⚡ sᴛᴀᴛᴜs : ${config.AUTO_RECORDING}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .autorecording on
    .autorecording off
✧══════════════════════✧
        `.trim());
    }
});

cmd({
    pattern: "autotyping",
    alias: ["autotype", "atyping"],
    desc: "Enable/Disable auto typing simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_TYPING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_TYPING', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⌨️ ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ
    ⚡ sᴛᴀᴛᴜs : ${config.AUTO_TYPING}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .autotyping on
    .autotyping off
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 2. CALL MANAGEMENT
// ============================================================

cmd({
    pattern: "anticall",
    alias: "acall",
    desc: "Auto reject calls",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('ANTI_CALL', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('ANTI_CALL', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    📞 ᴀɴᴛɪ ᴄᴀʟʟ
    ⚡ sᴛᴀᴛᴜs : ${config.ANTI_CALL}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .anticall on
    .anticall off
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 3. GROUP MANAGEMENT
// ============================================================

cmd({
    pattern: "welcome",
    desc: "Enable/Disable welcome messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('WELCOME', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('WELCOME', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👋 ᴡᴇʟᴄᴏᴍᴇ
    ⚡ sᴛᴀᴛᴜs : ${config.WELCOME}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .welcome on
    .welcome off
✧══════════════════════✧
        `.trim());
    }
});

cmd({
    pattern: "goodbye",
    desc: "Enable/Disable goodbye messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('GOODBYE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('GOODBYE', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👋 ɢᴏᴏᴅʙʏᴇ
    ⚡ sᴛᴀᴛᴜs : ${config.GOODBYE}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .goodbye on
    .goodbye off
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 4. READ & STATUS MANAGEMENT
// ============================================================

cmd({
    pattern: "autoread",
    desc: "Enable/Disable auto read messages",
    category: "settings",
    react: "👀"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('READ_MESSAGE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('READ_MESSAGE', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👀 ᴀᴜᴛᴏ ʀᴇᴀᴅ
    ⚡ sᴛᴀᴛᴜs : ${config.READ_MESSAGE}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .autoread on
    .autoread off
✧══════════════════════✧
        `.trim());
    }
});

cmd({
    pattern: "autoviewsview",
    alias: ["avs", "statusseen", "astatus"],
    desc: "Auto view status updates",
    category: "settings",
    react: "😎"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_VIEW_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_VIEW_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    👁️ ᴀᴜᴛᴏ ᴠɪᴇᴡ sᴛᴀᴛᴜs
    ⚡ sᴛᴀᴛᴜs : ${config.AUTO_VIEW_STATUS}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .autoviewsview on
    .autoviewsview off
✧══════════════════════✧
        `.trim());
    }
});

cmd({
    pattern: "autolikestatus",
    alias: ["als"],
    desc: "Auto like status updates",
    category: "settings",
    react: "❤️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_LIKE_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_LIKE_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❤️ ᴀᴜᴛᴏ ʟɪᴋᴇ sᴛᴀᴛᴜs
    ⚡ sᴛᴀᴛᴜs : ${config.AUTO_LIKE_STATUS}

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .autolikestatus on
    .autolikestatus off
✧══════════════════════✧
        `.trim());
    }
});

// ============================================================
// 5. SYSTEM
// ============================================================

cmd({
    pattern: "mode",
    desc: "Change bot mode",
    category: "settings",
    react: "⚙️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const mode = args[0]?.toLowerCase();
    const validModes = ['public', 'private', 'groups', 'inbox'];

    if (validModes.includes(mode)) {
        await updateConfig('WORK_TYPE', mode, botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⚙️ ᴍᴏᴅᴇ sᴇᴛᴛɪɴɢs
    ⚡ ᴄᴜʀʀᴇɴᴛ : ${config.WORK_TYPE}

✧══════════════════════✧
    ❮ ᴠᴀʟɪᴅ ᴍᴏᴅᴇs ❯
    ${validModes.join(' • ')}
✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .mode public
    .mode private
✧══════════════════════✧
        `.trim());
    }
});

cmd({
    pattern: "setprefix",
    desc: "Change bot prefix",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ⛔ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ
✧══════════════════════✧
    `.trim());
    
    const newPrefix = args[0];

    if (newPrefix) {
        if (newPrefix.length > 1 && newPrefix !== 'noprefix') return reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    ❌ ᴘʀᴇғɪx ᴛᴏᴏ ʟᴏɴɢ
    ᴜsᴇ sɪɴɢʟᴇ ᴄʜᴀʀᴀᴄᴛᴇʀ
✧══════════════════════✧
        `.trim());
        
        await updateConfig('PREFIX', newPrefix, botNumber, config, reply);
    } else {
        reply(`
✧══════════════════════✧
     ✦ ᴘʜᴀɴᴛᴏᴍ-χ ✦
✧══════════════════════✧

    🔤 ᴄᴜʀʀᴇɴᴛ ᴘʀᴇғɪx
    ⚡ ❮ ${config.PREFIX} ❯

✧══════════════════════✧
    ❮ ᴜsᴀɢᴇ ❯
    .setprefix .
    .setprefix !
    .setprefix noprefix
✧══════════════════════✧
        `.trim());
    }
});