const express = require("express");
const router = express.Router();

router.post("/radar", async (_req, res) => {
    const data = ["Desktop", "Laptop", "Impresora", "Periférico", "Tableta", "Smartphone", "Otro"].map(o => {
        return {
            type: o,
            planned: Math.floor(Math.random() * 20 + 30),
            actual: Math.floor(Math.random() * 15 + 20)
        };
    });
    res.json(data);
});

module.exports = router;
