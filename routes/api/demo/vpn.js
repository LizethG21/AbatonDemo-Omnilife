const express = require("express");
const router = express.Router();

router.post("/radar", async (_req, res) => {
    const data = ["región1", "región2", "región3", "región4", "región5"].map(o => {
        return {
            type: o,
            planned: Math.floor(Math.random() * 20 + 30),
            actual: Math.floor(Math.random() * 20 + 25)
        };
    });
    res.json(data);
});

router.post("/licencias", async (_req, res) => {
    const data = ["ocupadas", "libres", "vencidas"].map(o => {
        return {
            type: o,
            actual: Math.floor(Math.random() * (90 - 20) + 20)
        };
    });
    res.json(data);
});

module.exports = router;