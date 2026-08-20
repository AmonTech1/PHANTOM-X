// data/antidelete.js
// ═══════════════════════════════════════════════════════════════════════════
//  ✧══════════════════════════════════════════════════════════════════════✧
//     ✦ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴅᴀᴛᴀ ʜᴀɴᴅʟᴇʀ ✦
//  ✧══════════════════════════════════════════════════════════════════════✧
// ═══════════════════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

// ────────────────────────────────────────────────────────────────────────────
//  📦 ANTIDELETE SCHEMA
// ────────────────────────────────────────────────────────────────────────────

const antideleteSchema = new mongoose.Schema({
    chatId: { 
        type: String, 
        required: true, 
        unique: true,
        index: true 
    },
    status: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Antidelete = mongoose.model('Antidelete', antideleteSchema);

// ────────────────────────────────────────────────────────────────────────────
//  🔧 ANTIDELETE FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Get antidelete status for a chat
 * @param {string} chatId - The chat ID
 * @returns {Promise<boolean>} Status of antidelete
 */
const getAntideleteStatus = async (chatId) => {
    try {
        const data = await Antidelete.findOne({ chatId });
        return data ? data.status : false;
    } catch (error) {
        console.error('✧ ANTIDELETE: Error getting status:', error.message);
        return false;
    }
};

/**
 * Set antidelete status for a chat
 * @param {string} chatId - The chat ID
 * @param {boolean} status - Status to set
 * @returns {Promise<boolean>} Success or failure
 */
const setAntideleteStatus = async (chatId, status) => {
    try {
        await Antidelete.findOneAndUpdate(
            { chatId }, 
            { 
                status, 
                updatedAt: new Date() 
            }, 
            { 
                upsert: true, 
                new: true 
            }
        );
        console.log(`✧ ANTIDELETE: Status set to ${status} for ${chatId}`);
        return true;
    } catch (error) {
        console.error('✧ ANTIDELETE: Error setting status:', error.message);
        return false;
    }
};

/**
 * Toggle antidelete status for a chat
 * @param {string} chatId - The chat ID
 * @returns {Promise<boolean>} New status
 */
const toggleAntideleteStatus = async (chatId) => {
    try {
        const current = await getAntideleteStatus(chatId);
        const newStatus = !current;
        await setAntideleteStatus(chatId, newStatus);
        return newStatus;
    } catch (error) {
        console.error('✧ ANTIDELETE: Error toggling status:', error.message);
        return false;
    }
};

/**
 * Get all chats with antidelete enabled
 * @returns {Promise<Array>} List of chat IDs with antidelete enabled
 */
const getAntideleteEnabledChats = async () => {
    try {
        const data = await Antidelete.find({ status: true });
        return data.map(item => item.chatId);
    } catch (error) {
        console.error('✧ ANTIDELETE: Error getting enabled chats:', error.message);
        return [];
    }
};

// ────────────────────────────────────────────────────────────────────────────
//  📤 EXPORTS
// ────────────────────────────────────────────────────────────────────────────

module.exports = { 
    Antidelete, 
    getAntideleteStatus, 
    setAntideleteStatus,
    toggleAntideleteStatus,
    getAntideleteEnabledChats
};