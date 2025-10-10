const { Client, GatewayIntentBits} = require('discord.js');

let client;

function getClient() {
    if (!client) {
        client = new Client({
            intents: [
                GatewayIntentBits.Guilds, // 서버 정보를 가져오기 위해 필요
                GatewayIntentBits.GuildMessages, // 메시지 이벤트 수신
                GatewayIntentBits.MessageContent, // 메시지 내용 읽기
            ],
        });
    }
    return client;
}

module.exports = { getClient };
