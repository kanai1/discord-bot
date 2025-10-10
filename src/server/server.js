const path = require('path');
const express = require('express');
const testRoute = require(path.join(process.cwd(), 'src/server/routes/test'));

function createExpressServer(client) {
    const app = express();
    app.use(express.json());

    app.use('/test', testRoute());

    // 서버 실행
    const PORT = process.env.PORT;
    app.listen(PORT, () =>
        console.log(`Express server running on port ${PORT}`)
    );

    return app;
}

module.exports = createExpressServer;
