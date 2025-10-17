require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const e = require('express');

const commands = [];

// commands 폴더 경로
const commandsPath = path.join(process.cwd(), 'commands');

// commands 폴더 내부 탐색
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);

    // 하위에 여러 파일이 있는 그룹 명령어 폴더일 경우
    if (fs.statSync(folderPath).isDirectory()) {
        const commandFiles = path.join(folderPath, 'index.js');
        if(fs.existsSync(commandFiles)) {
            const command = require(commandFiles);
            commands.push(command.data.toJSON());
        }
    } 
    // 단일 명령어 파일일 경우
    else if (folder.endsWith('.js')) {
        const command = require(folderPath);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands...');

        // 테스트 서버 등록 (빠른 반영)
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        // 글로벌 등록 (전역 반영 시)
        // await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
