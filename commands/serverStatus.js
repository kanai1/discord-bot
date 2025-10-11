const path = require('path');
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const sysinfo = require(path.join(process.cwd(), 'src/handlers/sysinfo'));
const { BOT_COLOR } = require(path.join(process.cwd(), 'configs/constants'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstatus')
        .setDescription('서버의 리소스를 확인합니다.(개발중)'),
    async execute(interaction) {
        await interaction.reply({ content: '🔧 리소스를 측정중입니다...', flags: MessageFlags.Ephemeral });
        const stats = await sysinfo();
        
        const embed = new EmbedBuilder()
            .setTitle('서버 상태')
            .addFields(
                { name: 'CPU 사용량', value: stats.cpuUsage },
                { name: '메모리 사용량', value: stats.memUsage },
                { name: '디스크 사용량', value: stats.diskUsage}
            )
            .setColor(BOT_COLOR)
            .setTimestamp();

        await interaction.editReply({
            content: '✅ 서버 리소스 측정 완료!'
        });

        await interaction.followUp({ embeds: [embed] });
    },
};