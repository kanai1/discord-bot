const path = require('path');
const { getRconClient } = require(path.join(process.cwd(), 'src/client'));
const { createMCServerStatusEmbed } = require(path.join(process.cwd(), 'src/utils/embedMaker'));

module.exports = {
    name: 'status',
    description: '마인크래프트 서버의 상태를 모니터링합니다.',

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
            response.tps = response.tps.replace(/§./g, ''); // 색상코드 제거
            const tpsMatch = response.tps.match(/TPS from last 1m, 5m, 15m:\s*(\d+\.?\d*),\s*(\d+\.?\d*),\s*(\d+\.?\d*)/);
            if (tpsMatch) {
                response.tps = parseFloat(tpsMatch[1]);
            }
            else {
                console.error('tps response parsing error');
                response.tps = -1;
            }
            if (playersMatch) {
                response.players = `${playersMatch[1]} / ${playersMatch[2]}`;
            } else {
                console.error('list respnse parsing error');
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

        console.log(`마인크래프트 서버 상태 전송 완료 (요청자: ${interaction.user.tag})`);
    },
};