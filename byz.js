class ByzantineTime {
    constructor(sunrise, sunset) {
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.dayLength = sunset - sunrise;
        this.dayHour = this.dayLength / 12;
        this.nightHour = (24 * 60 - this.dayLength) / 12;
    }

    static toGreekNumber(x) {
        const greekNumbers = {
            0: "",
            1: "α", 2: "β", 3: "γ", 4: "δ", 5: "ε",
            6: "ϛ", 7: "ζ", 8: "η", 9: "θ", 10: "ι",
            20: "κ", 30: "λ", 40: "μ", 50: "ν", 60: "ξ"
        };

        return greekNumbers[Math.trunc(x / 10) * 10] + greekNumbers[x % 10] + "\u{0374}";
    }

    getTime(h, m) {
        const mins = toMinutes(h, m);
        let byz;
        let night = false;
        if (mins > this.sunrise && mins < this.sunset) {
            byz = (mins - this.sunrise) / (this.sunset - this.sunrise) * 12 * 60;
        }
        else {
            let diff = mins - this.sunset
            if (diff < 0) {
                diff = 24 * 60 + diff;
            }
            byz = diff / (24 * 60 - (this.sunset - this.sunrise)) * 12 * 60;
            night = true;
        }
        let [bh, bm] = fromMinutes(byz);
        return [`ὥρα ${ByzantineTime.toGreekNumber(bh+1)} καὶ λεπτά ${ByzantineTime.toGreekNumber(bm+1)} τῆς ${night ? "νυκτός" : "ἡμέρας"}`, bh, bm];
    }
}
