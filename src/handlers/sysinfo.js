async function getCPUUsage() {
    const res = await fetch('http://glances:61208/api/4/cpu');
    const data = await res.json();
    return data.total;
}

async function getMemUsage() {
    const res = await fetch('http://glances:61208/api/4/mem');
    const data = await res.json();
    return data.percent;
}

async function getDiskUsage() {
    const res = await fetch('http://glances:61208/api/4/fs');
    const data = await res.json();
    return data[0].percent;
}

async function getCPUTemp() {
    const res = await fetch('http://glances:61208/api/4/sensors');
    const data = await res.json();
    return data[0].value;
}

module.exports = async function getSystemStats() {
    const [cpuUsage, memUsage, diskUsage, cpuTemp] = await Promise.all([
        getCPUUsage(),
        getMemUsage(),
        getDiskUsage(),
        getCPUTemp()
    ]);

    return {
        cpuUsage,
        memUsage,
        diskUsage,
        cpuTemp
    };
}