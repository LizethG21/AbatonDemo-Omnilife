const express = require("express");
const router = express.Router();

router.post("/timeline", async (_req, res) => {
    const d = new Date();
    const data = new Array(24).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        jitter: Math.floor((Math.random() * 0.9 + 0.1) * 80),
        latency: Math.floor((Math.random() * 0.9 + 0.1) * 50),
        loss: Math.floor((Math.random() * 0.9 + 0.1) * 50)
    }));
    res.json(data);
});

router.post("/timeline2", async (_req, res) => {
    const d = new Date();
    const data = new Array(24).fill().map((_o, i) => ({
        date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
        avg: Math.floor((Math.random() * 0.9 + 0.1) * 120)
    }));
    res.json(data);
});

module.exports = router;
