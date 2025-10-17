const { SlashCommandBuilder } = require('discord.js');

const baseCommand = new SlashCommandBuilder()
    .setName('minecraft')
    .setDescription('마인크래프트 서버를 관리합니다.');

module.exports = { baseCommand };