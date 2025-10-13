const path = require('path');
const { getBotClient } = require(path.join(process.cwd(), 'src/client'));
client = getBotClient();


module.exports = { 
    sendMessagetoChannel: async (channelId, message) => {
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
    }, 
    sendMessagetoUser: async (userID, message) => {
        try {
            const user = await client.users.fetch(userID);
            if (!user) {
                throw new Error(`User with ID ${userID} not found`);
            }

            await user.send(message);
            console.log(`Message sent to user ${userID}: ${message}`);
            return { success: true };
        } catch (err) {
            console.error(`Failed to send message: ${err.message}`);
            return { success: false, error: err.message };
        }
    }
};