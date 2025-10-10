const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = (client) => {
  // 명령어 로딩
    client.commands = new Collection();
    const commandFiles = fs.readdirSync(path.join(process.cwd(), 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(process.cwd(), `commands/${file}`));
        client.commands.set(command.data.name, command);
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
            await interaction.reply({ content: '오류가 발생했습니다!', ephemeral: true });
        }
    });
};
