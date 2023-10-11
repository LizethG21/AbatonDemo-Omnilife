function fmt(f) {
    return _fmt[f] || (o => o);
}

const _fmt = {
    n: value => _fmt.N(value, 0),
    c: value => "$" + _fmt.N(value, 0),
    ch3: value => "$" + _fmt.H(value, 1e3),
    ch6: value => "$" + _fmt.H(value, 1e6),
    p: value => _fmt.P(value, 0),
    p1: value => _fmt.P(value, 1),
    p2: value => _fmt.P(value, 2),
    p100: value => {
        return Math.round(value) + "%";
    },
    h3: value => _fmt.H(value, 1e3),
    h6: value => _fmt.H(value, 1e6),
    ah3: value => _fmt.H(Math.abs(value), 1e3),
    ah6: value => _fmt.H(Math.abs(value), 1e6),
    dHM: value => moment(value).format("HH:mm"),

    N: (value, digits) => {
        return new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(value);
    },
    P: (value, digits) => {
        return _fmt.N(value * 100, digits) + "%";
    },
    H: (value, max) => {
        if (value == null || value == undefined) return "-";
        const suffix = ["", " K", " M", "G"];
        let k = 0;
        while (value >= max && k < suffix.length) {
            value /= 1e3;
            k++;
        }
        return _fmt.N(value, 0) + suffix[k];
    }
};

if (typeof module !== "undefined" && module.exports) module.exports = fmt;
