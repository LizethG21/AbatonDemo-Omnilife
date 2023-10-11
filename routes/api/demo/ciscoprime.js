const express = require("express");
const router = express.Router();

router.post("/accesspoints", async (_res, res) => {
    const data = ["OK", "Service", "Fallo"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * (150 - 120) + 120)
    }));
    data[1].count = data[1].count / 5;
    data[2].count = data[2].count / 10;
    res.json(data);
});

module.exports = router;