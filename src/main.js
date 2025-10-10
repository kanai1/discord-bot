require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

// 봇 클라이언트 생성
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,            // 서버 정보를 가져오기 위해 필요
        GatewayIntentBits.GuildMessages,     // 메시지 이벤트 수신
        GatewayIntentBits.MessageContent     // 메시지 내용 읽기
    ]
});

client.commands = new Collection();

// 명령어 로딩
const commandFiles = fs.readdirSync(path.join(process.cwd(), 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(process.cwd(), `commands/${file}`));
    client.commands.set(command.data.name, command);
}

// 봇이 준비되었을 때
client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '오류가 발생했습니다!', ephemeral: true });
    }
});

// 봇 로그인
client.login(process.env.BOT_TOKEN);
