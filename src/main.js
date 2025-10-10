require('dotenv').config();
const path = require('path');

const { getClient } = require(path.join(process.cwd(), 'src/client'));
const createExpressServer = require(path.join(
    process.cwd(),
    'src/server/server'
));
const registerCommandHandler = require(path.join(
    process.cwd(),
    'src/handlers/commandHandler'
));

const client = getClient();
registerCommandHandler(client);

// 봇이 준비되었을 때
client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// 봇 로그인
client.login(process.env.BOT_TOKEN);

// Express 서버 시작
createExpressServer(client);

process.on('SIGINT', async () => {
    console.log('봇 종료 중...');
    process.exit();
});
