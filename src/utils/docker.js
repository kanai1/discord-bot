const { exec } = require('child_process');

function runDockerCompose(command, composePath) {
    return new Promise((resolve, reject) => {
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
