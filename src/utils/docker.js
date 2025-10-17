const { exec } = require('child_process');

function runDockerComposeUp(composePath) {
    return new Promise((resolve, reject) => {
        console.log(`docker-compose -f ${composePath} up -d`);
        exec(`docker-compose -f ${composePath} up -d`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || error.message);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

module.exports = { runDockerComposeUp };
