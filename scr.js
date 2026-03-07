let longitude = (30 + 0.364624 / 0.600000) / 15 * 60;

function $e(id) {
    return document.getElementById(id);
}

function equationOfTime() {
    const now = new Date();
    const n = Math.trunc((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const b = 2 * Math.PI * (n - 81) / 365;
    return 7.53 * Math.cos(b) + 1.5 * Math.sin(b) - 9.87 * Math.sin(2 * b);
}

function toHours(h, m) {
    return h + m / 60;
}

function toMinutes(h, m) {
    return h * 60 + m;
}

function dateToHM(d) {
    return [d.getHours(), d.getMinutes()];
}

function fromMinutes(m) {
    return [Math.trunc(m / 60), Math.trunc(m % 60)];
}

function localToSolar(h, m) {
    return toMinutes(h, m) + new Date().getTimezoneOffset() + longitude - equationOfTime();
}

function solarToLocal(h, m) {
    return toMinutes(h, m) - new Date().getTimezoneOffset() - longitude + equationOfTime()
}

function localToAngle(m) {
    return m / 24 / 60 * 360 + 180 - skew;
}

function setHand() {
    const d = new Date();
    const angle = localToAngle(toMinutes(d.getHours(), d.getMinutes()));
    $e("hand").setAttribute("transform", `rotate(${angle})`);
}

function addSector(start, duration, color) {
    const sector = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    sector.setAttribute("href", "#sector");
    sector.setAttribute("stroke-dasharray", `0 ${start} ${duration} 24`);
    sector.setAttribute("stroke", color);
    $e("sectors").appendChild(sector);
}
