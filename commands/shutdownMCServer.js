const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { getRconClient } = require(path.join(process.cwd(), 'src/client'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdownmcserver')
        .setDescription('마인크래프트 서버를 종료합니다.'),
    async execute(interaction) {
        await interaction.reply({ content: '🔧 서버 인원을 확인중입니다...'});
        const rcon = getRconClient();
        let response;

        let isShutdown = false;

        try {
            response = await rcon.send('list');
        } catch (error) {
            console.error('RCON 명령어 실행 실패:', error);
            await interaction.editReply({ content: '❌ 서버연결에 실패했습니다. 관리자에게 문의하세요.' });
            return;
        }

        const match = response.match(/There are (\d+) of a max of (\d+) players/);
        if  (!match) {
            console.error('접속자 수 파싱 실패:', response);
            await interaction.editReply({
                content: '❌ 서버연결에 실패했습니다. 관리자에게 문의하세요.'
            });
        } else {
            if (match[1] == 0) {
                try {
                    await rcon.send('stop');
                    await interaction.editReply({ content: '✅ 마인크래프트 서버를 성공적으로 종료했습니다.' });
                    isShutdown = true;
                    console.log(`마인크래프트 서버 종료 완료 (요청자: ${interaction.user.tag})`);
                } catch (error) {
                    console.error('서버 종료 명령어 실행 실패:', error);
                    await interaction.editReply({ content: '❌ 서버 종료에 실패했습니다. 관리자에게 문의하세요.' });
                }
            } else {
                await interaction.editReply({ content: `❌ 서버에 현재 ${match[1]}명의 유저가 접속중입니다. 모든 유저가 퇴장한 후 다시 시도해주세요.` });
            }
        }
        if (!isShutdown) {
            console.log(`마인크래프트 서버 종료 실패 (요청자: ${interaction.user.tag})`);
        }

    },
};