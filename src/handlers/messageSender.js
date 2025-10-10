const path = require('path');
const { getClient } = require(path.join(process.cwd(), 'src/client'));
client = getClient();

module.exports = async function sendMessage(channelId, message) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel) {
            throw new Error(`Channel with ID ${channelId} not found`);
        }

        await channel.send(message);
        console.log(`Message sent to channel ${channelId}: ${message}`);
        return { success: true };
    } catch (err) {
        console.error(`Failed to send message: ${err.message}`);
        return { success: false, error: err.message };
    }
};