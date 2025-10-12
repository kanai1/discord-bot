const express = require('express');
const path = require('path');
const createServerMonitorEmbed = require(path.join(process.cwd(), 'src/handlers/embedMaker'));
const {sendMessagetoUser} = require(path.join(process.cwd(), 'src/handlers/messageSender'));

module.exports = function testRoute() {
    const router = express.Router();
    router.post('/', (req, res) => {
        const { cpu, mem, disk, sensor } = req.body;
        console.log(req.body);
        console.log(cpu, mem, disk, sensor);
        const embed = createServerMonitorEmbed(cpu, mem, disk, sensor); 
        
        sendMessagetoUser(process.env.MASTER_ID, { embeds: [embed] });
        res.status(200).send('Alert received');
    });
    return router;
};