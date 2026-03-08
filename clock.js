function clock(sunriseMin, sunsetMin, bt) {
    document.getElementById("local-clock").setAttribute("transform", `rotate(-${skew})`);

    renderClock('local-clock', 78, 'local-text');
    renderClock('solar-clock', 53, 'solar-text');

    setHand();
    setInterval(setHand, 30000);

    addSector(0, 8, "blue")
    addSector(8.5, 1, "orange");
    addSector(12.5, 1, "orange");
    addSector(16.5, 1, "orange");
    addSector(20.5, 1, "orange");
    const sunriseAngle = localToAngle(sunriseMin);
    const sunsetAngle = localToAngle(sunsetMin);

    $e("sun").innerHTML = `
       <use href="#sunline" transform="rotate(${sunriseAngle})"/>
       <use href="#sunline" transform="rotate(${localToAngle(sunsetMin)})"/>
` + (tms.night.valueOf() ? `
       <use href="#nightline" transform="rotate(${localToAngle(toMinutes.apply(null, dateToHM(tms.night)))})"/>
       <use href="#nightline" transform="rotate(${localToAngle(toMinutes.apply(null, dateToHM(tms.nightEnd)))})"/>
       ` : "");

    const r = 37;
    renderClock("horae-temporales", r, 'temporal-text', 12, sunriseAngle, sunsetAngle - sunriseAngle, numbers=[null, "Α", "Β", "Γ", "Δ", "Ε", "Ϛ", "Ζ", "Η", "Θ", "Ι", "ΙΑ", "ΙΒ",], getTextCoords = calcTextBetween);
    renderClock("horae-temporales", r, 'temporal-text', 12, sunsetAngle, 360 - (sunsetAngle - sunriseAngle), numbers=[null, "Α", "Β", "Γ", "Δ", "Ε", "Ϛ", "Ζ", "Η", "Θ", "Ι", "ΙΑ", "ΙΒ",], getTextCoords = calcTextBetween);
    $e("dayhourlen").textContent = bt.dayHour.toFixed(2);
    $e("nighthourlen").textContent = bt.nightHour.toFixed(2);

    function fmt(x) {
        return String(x).padStart(2, "0");
    }

    function tfmt(h, m) {
        return `${fmt(h)}:${fmt(m)}`;
    }

    function updTime() {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        $e("local-time").textContent = tfmt(h, m);
        const solar = localToSolar(h, m);
        const [sh, sm] = fromMinutes(solar < 0 ? 24 * 60 + solar : solar);
        $e("solar-time").textContent = tfmt(sh, sm);

        const [s, bh, bm] = bt.getTime(h, m);
        $e("byzantine-time").textContent = s;
        $e("byzantine-time").title = tfmt(bh, bm);
    }

    setInterval(updTime, 2000);
    updTime();
}
