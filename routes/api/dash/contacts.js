const express = require("express");
const router = express.Router();

router.post("/bar", async (_req, res) => {
    const names = ["Correo","Llamadas","Portal"];
    const data = new Array(3).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(1500-230+1)+230),
            total: Math.floor(Math.random()*(3000-230+1)+230)
        };
        return o;
    });
    res.json(data);

});


module.exports = router;