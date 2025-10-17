const { exec } = require('child_process');

function runDockerCompose(command, composePath) {
    return new Promise((resolve, reject) => {
        console.log(`docker compose -f ${composePath} ${command}`);
        exec(`docker compose -f ${composePath} ${command}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || error.message);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

module.exports = { runDockerCompose };
