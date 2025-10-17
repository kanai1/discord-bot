const path = require('path');
const {EmbedBuilder} = require('discord.js');
const { BOT_COLOR } = require(path.join(process.cwd(), 'configs/constants'));

function createServerMonitorEmbed(cpuUsage, memUsage, diskUsage, cpuTemp) {
    return new EmbedBuilder()
        .setTitle('서버 상태')
        .addFields(
            { name: 'CPU 사용량', value: cpuUsage + '%' },
            { name: '메모리 사용량', value: memUsage + '%' },
            { name: '디스크 사용량', value: diskUsage + '%' },
            { name: 'CPU 온도', value: cpuTemp + '°C' }
        )
        .setColor(BOT_COLOR)
        .setTimestamp();
}

function createMCServerStatusEmbed(tps, players) {
    if (tps == 20) tps = '🟢 20 (최적)';
    else if (tps >= 16) tps = `🟡 ${tps} (양호)`;
    else tps = `🔴 ${tps} (불안정)`;

    return new EmbedBuilder()
        .setTitle('마인크래프트 서버 상태')
        .addFields(
            { name: 'TPS', value: tps },
            { name: '접속자 수', value: players }
        )
        .setColor(BOT_COLOR)
        .setTimestamp();
}

module.exports = { createServerMonitorEmbed, createMCServerStatusEmbed };
