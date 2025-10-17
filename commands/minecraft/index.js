const path = require('path');
const { baseCommand } = require(path.join(process.cwd(), 'commands/minecraft/basecommand'));
const start = require(path.join(process.cwd(), 'commands/minecraft/start'));
const stop = require(path.join(process.cwd(), 'commands/minecraft/stop'));
const status = require(path.join(process.cwd(), 'commands/minecraft/status'));

const subcommands = [start, stop, status];

for (const sub of subcommands) {
    baseCommand.addSubcommand((cmd) =>
        cmd.setName(sub.name).setDescription(sub.description)
    );
}

module.exports = {
    data: baseCommand,
    async execute(interaction) {
        const sub = subcommands.find(
            (s) => s.name === interaction.options.getSubcommand()
        );
        if (!sub) return interaction.reply('❌ 알 수 없는 명령어입니다.');
        await sub.execute(interaction);
    },
};
