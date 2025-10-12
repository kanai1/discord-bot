function getCPUUsage() {
    const res = fetch('http://glances:61208/api/4/cpu');
    const data = res.json();
    return data.total + '%';
}

function getMemUsage() {
    const res = fetch('http://glances:61208/api/4/mem');
    const data = res.json();
    return data.percent + '%';
}

function getDiskUsage() {
    const res = fetch('http://glances:61208/api/4/fs');
    const data = res.json();
    return data[0].percent + '%';
}

function getCPUTemp() {
    const res = fetch('http://glances:61208/api/4/sensors');
    const data = res.json();
    return data[0].current + '°C';
}

module.exports = async function getSystemStats() {
    
    return {
        cpuUsage: getCPUUsage(),
        memUsage: getMemUsage(),
        diskUsage: getDiskUsage(),
        cpuTemp: getCPUTemp()
    };
}