const express = require("express");
const router = express.Router();

router.post("/timeline", async (_req, res) => {
    const d = new Date();
    const data = new Array(24).fill().map((_o, i) => {
        const o = {
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            total: Math.floor((Math.random() * 0.6 + 0.4) * 100)
        };
        o.abandon = Math.floor(Math.random() * 0.1 * o.total);
        return o;
    });
    res.json(data);
});

module.exports = router;
