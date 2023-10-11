const express = require("express");
const router = express.Router();

router.post("/health", async (_res, res) => {
    const data = ["healthy", "unhealthy", "unmonitored"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * 100)
    }));
    res.json(data);
});

router.post("/line", async (_res, res) => {
    const d = new Date();
    const data = new Array(24).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        health: Math.floor((Math.random() * (99 - 85)) + 85)
    }));
    res.json(data);
});

router.post("/devices", async (_res, res) => {
    const data = ["Router", "Access", "Distribution","Wireless","Error"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * (150 - 50) + 50)
    }));
    data[4].count = (data[4].count / 10) - 7;
    res.json(data);
});

router.post("/licenses", async (_res, res) => {
    const data = ["Switches", "Routers","Wireless","Libres"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * (150 - 50) + 50)
    }));
    data[3].count = (data[3].count / 10) - 4;
    res.json(data);
});

router.post("/sites", async (_res, res) => {
    const data = ["DNS Servers", "HTTP Servers","NTP","Error"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * (100 - 70) + 70)
    }));
    data[3].count = (data[3].count / 10) - 4;
    res.json(data);
});

module.exports = router;