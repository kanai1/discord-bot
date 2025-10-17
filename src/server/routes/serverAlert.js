const express = require('express');
const path = require('path');
const { createServerMonitorEmbed } = require(path.join(process.cwd(), 'src/utils/embedMaker'));
const { sendMessagetoUser } = require(path.join(process.cwd(), 'src/utils/messageSender'));

module.exports = function testRoute() {
    const router = express.Router();
    router.post('/', (req, res) => {
        const { cpu, mem, disk, sensor } = req.body;
        const embed = createServerMonitorEmbed(cpu, mem, disk, sensor); 
        
        sendMessagetoUser(process.env.MASTER_ID, {
            content: '⚠️서버 경고 알림⚠️',
            embeds: [embed] 
            });
        res.status(200).send('Alert received');
    });
    return router;
};