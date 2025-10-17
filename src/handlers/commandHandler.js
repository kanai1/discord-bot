const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = (client) => {
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
                client.commands.set(command.data.name, command);
            }
        } 
        // 단일 명령어 파일일 경우
        else if (folder.endsWith('.js')) {
            const command = require(folderPath);
            client.commands.set(command.data.name, command);
        }
    }

    // 인터랙션 처리
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '오류가 발생했습니다!',
                ephemeral: true,
            });
        }
    });
};
