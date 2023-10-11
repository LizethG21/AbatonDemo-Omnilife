const moment = require("moment");
const period = require("./period");
const self = exports;

exports.get = async (f) => {
    const esx = [
        "ESXi-HX-COR-N2",
        "ESXi-HX-COR-N1",
        "ESXi-NOR-N2",
        "ESXi-HX-COR-N3",
        "ESXi-HX-COR-N4",
        "ESXi-HX-COR-N5",
    ];
    const ip = [
        "185.152.10.2",
        "185.152.52.26",
        "175.185.14.2",
        "185.152.52.20",
        "185.152.25.2",
        "185.152.41.52",
    ];
    const mac = [
        "b9:30:84:92:21:35",
        "e6:f7:ca:be:f3:3b",
        "24:db:20:f1:ac:d1",
        "37:4f:f8:a3:fa:ee",
        "7b:c1:67:58:9a:07",
        "d1:fd:b3:61:39:2f",
    ];
    const data = new Array(6).fill().map((_o, i) => ({
        id: i,
        server: esx[i],
        ip: ip[i],
        mac: mac[i],
        cpu: (Math.random() * (100 - 20) + 20).toFixed() + "%",
        ram: (Math.random() * (100 - 20) + 20).toFixed()  + "%",
        disco: (Math.random() * (100 - 20) + 20).toFixed()  + "%"
    }));

    return data;
};
