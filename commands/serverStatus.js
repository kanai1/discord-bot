const path = require('path');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const sysinfo = require(path.join(process.cwd(), 'src/utils/sysinfo'));
const { createServerMonitorEmbed } = require(path.join(process.cwd(), 'src/utils/embedMaker'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstatus')
        .setDescription('서버의 리소스를 확인합니다.'),
    async execute(interaction) {
        await interaction.reply({ content: '🔧 리소스를 측정중입니다...', flags: MessageFlags.Ephemeral });
        const stats = await sysinfo();
        const embed = createServerMonitorEmbed(stats.cpuUsage, stats.memUsage, stats.diskUsage, stats.cpuTemp);

        await interaction.editReply({
            content: '✅ 서버 리소스 측정 완료!'
        });

        await interaction.followUp({ embeds: [embed] });
    },
};