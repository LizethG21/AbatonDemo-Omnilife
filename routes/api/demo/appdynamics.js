const express = require("express");
const router = express.Router();

router.post("/events", async (_req, res) => {
    const name = ["Login","Logout","Checkout","UpdateName","UpdateProfile","AccountHome"];
    const health=["Warning","Critical","Good"]
    var data=[];
    for(let i=0;i<6;i++)
    {
        data.push({
            Name:name[i],
            Health:health[Math.floor(Math.random()*health.length)],
            ResponseTime:Math.floor(Math.random() * 1500),
            CallsPerMin:Math.floor(Math.random() * 50),
            ErrorsPerMin:Math.floor(Math.random() * 5),
            ErrorPercent:Math.floor(Math.random() * 10),
            SlowPercent:Math.floor(Math.random() * 4),
            VerySlowPercent:Math.floor(Math.random() * 5)
        })
    }
    res.json(data);
});


module.exports = router;