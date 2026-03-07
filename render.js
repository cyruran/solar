function calcTextUnderMark(radius, angle, prevAngle) {
    const rad = (angle - 90) * Math.PI / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    return [x, y];
}

function calcTextBetween(radius, angle, prevAngle) {
    const rad = ((angle + prevAngle) / 2 - 90) * Math.PI / 180;
    const r = radius * 1.1 + 2;
    const x = r * Math.cos(rad);
    const y = r * Math.sin(rad);
    return [x, y];
}

function renderClock(containerId, radius, textClass, count = 24, initial = 180, full = 360, numbers = null, getTextCoords = calcTextUnderMark) {
    const container = $e(containerId);
    let prevAngle = initial;

    for (let i = 1; i <= count; i++) {
        const angle = i * (full / count) + initial;

        container.innerHTML += `<use href="#mark" transform="rotate(${angle} 0 0) translate(0, ${-radius*1.1}) scale(1, ${radius / 40})"/>`;

        const parentRotation = -container.getAttribute('transform')?.match(/rotate\(([^,)]+)\)/)?.[1] || 0;
        const totalBackRotate = -angle;

        const [x, y] = getTextCoords(radius, angle, prevAngle);
        prevAngle = angle;

        const sym = numbers ? numbers[i] : i;

        container.innerHTML += `
        <text x="${x}" y="${y}" class="${textClass}"
              text-anchor="middle" dominant-baseline="central"
              transform="rotate(${parentRotation}, ${x}, ${y})">${sym}</text>`;
    }
}
