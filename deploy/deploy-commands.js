require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];
const commandFiles = fs.readdirSync(path.join(process.cwd(), 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(process.cwd(), `commands/${file}`));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // 테스트 서버용
        // Routes.applicationCommands(process.env.CLIENT_ID), // 글로벌용
        { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
    console.error(error);
    }
})();
