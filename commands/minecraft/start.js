const path = require('path');
const { runDockerComposeUp } = require(path.join(process.cwd(), 'src/utils/docker'));

module.exports = {
    name: 'start',
    description: '마인크래프트 서버를 시작합니다.',
    
    async execute(interaction) {
        await interaction.reply({ content: '🔧 서버를 시작중입니다...'});

        const composeFile = '/usr/src/app/mc-docker-compose.yml'; // compose 파일 경로
        try {
            const result = await runDockerComposeUp(composeFile);
            await interaction.editReply({
                content: `✅ 서버 실행 완료!\n\`\`\`${result}\`\`\``,
            });
        } catch (err) {
            await interaction.editReply({
                content: `❌ 서버 실행 실패:\n\`\`\`${err}\`\`\``,
            });
        }


    },
};