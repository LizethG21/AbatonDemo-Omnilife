const express = require("express");
const router = express.Router();

router.post("/radar", async (_req, res) => {
    const names = ["Desktop","Laptops","Impresoras","Periféricos","Tablets","Smartphones","Otro"];
    const data = new Array(7).fill().map((_o, i) => {
        const o = {
            label: names[i],
            planing: Math.floor(Math.random()*(100-80+1)+80),
            real: Math.floor(Math.random()*(80-50+1)+50)
        };
        return o;
    });
    res.json(data);

});


module.exports = router;