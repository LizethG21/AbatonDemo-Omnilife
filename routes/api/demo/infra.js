const express = require("express");
const router = express.Router();

router.post("/powerUser", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            cpu: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            totalcpu: Math.floor(300),
            ram: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 170),
            totalram: Math.floor(180),
            disco: Math.floor(Math.random() * 480),
            totaldisco: Math.floor(480),
            cpuV: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            totalcpuV: Math.floor(100),
            ramV: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 170),
            totalramV: Math.floor(180)
        };
        return o;
    });
    res.json(data);
});
module.exports = router;