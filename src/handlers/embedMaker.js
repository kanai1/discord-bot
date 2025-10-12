const path = require('path');
const {EmbedBuilder} = require('discord.js');
const { BOT_COLOR } = require(path.join(process.cwd(), 'configs/constants'));

module.exports = function createServerMonitorEmbed(cpuUsage, memUsage, diskUsage, cpuTemp) {
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
