const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { getRconClient } = require(path.join(process.cwd(), 'src/client'));
const { createMCServerStatusEmbed } = require(path.join(process.cwd(), 'src/handlers/embedMaker'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcserverstatus')
        .setDescription('마인크래프트 서버의 상태를 모니터링합니다.'),
    async execute(interaction) {
        await interaction.reply({ content: '🔧 서버 정보를 확인중입니다.'});
        const rcon = await getRconClient();
        let response = {
            tps: -1, 
            players: '0 / 0'
        };
        
        try {
            response.tps = '20';
            response.tps = await rcon.send('tps');
            response.players = await rcon.send('list');
            const playersMatch = response.players.match(/There are (\d+) of a max of (\d+) players/);
            const tpsMatch = response.tps.match(/TPS from last 1m, 5m, 15m: ([\d.]+), ([\d.]+), ([\d.]+)/);
            if (tpsMatch) {
                response.tps = parseFloat(tpsMatch[1]);
            }
            else if (playersMatch) {
                response.players = `${playersMatch[1]} / ${playersMatch[2]}`;
            } else {
                console.error('respnse parsing error');
                response.tps = -1;
                response.players = '알 수 없음';
            }
        } catch (error) {
            console.error('RCON 명령어 실행 실패:', error);
            await interaction.editReply({ content: '❌ 서버연결에 실패했습니다. 관리자에게 문의하세요.' });
            return;
        }

        const embed = createMCServerStatusEmbed(response.tps, response.players);

        await interaction.editReply({
            content: '✅ 서버 정보 수집 완료!'
        });

        await interaction.followUp({ embeds: [embed] });
    },
};