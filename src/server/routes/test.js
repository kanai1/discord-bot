const express = require('express');
const path = require('path');

const sender = require(path.join(process.cwd(), 'src/handlers/messageSender'));

module.exports = function testRoute() {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.send('Test route is working!');
        try{
            sender(process.env.TEST_CHANNEL_ID, 'Test message from Express server!');
        } catch (err) {
            console.error('Failed to send test message:', err);
        }
    });
    return router;
};