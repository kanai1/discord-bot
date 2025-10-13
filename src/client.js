const { Client, GatewayIntentBits} = require('discord.js');
const { Rcon } = require('rcon-client');

let botClient;
let rconClient

function getBotClient() {
    if (!botClient) {
        botClient = new Client({
            intents: [
                GatewayIntentBits.Guilds, // 서버 정보를 가져오기 위해 필요
                GatewayIntentBits.GuildMessages, // 메시지 이벤트 수신
                GatewayIntentBits.MessageContent, // 메시지 내용 읽기
            ],
        });
    }
    return botClient;
}

function getRconClient() {
    if (!rconClient) {
        rconClient = new Rcon({
            host: process.env.RCON_HOST,
            port: process.env.RCON_PORT,
            password: process.env.RCON_PASSWORD,
        });
        rconClient.connect().catch(console.error);
    }
    return rconClient;
}

module.exports = { getBotClient , getRconClient};
