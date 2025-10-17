const { exec } = require('child_process');

function runDockerComposeUp(composePath) {
    return new Promise((resolve, reject) => {
        console.log(`docker compose up -f ${composePath}`);
        exec(`docker compose -f ${composePath} ${command} up -d`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || error.message);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

module.exports = { runDockerComposeUp };
