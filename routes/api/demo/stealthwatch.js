const express = require("express");
const router = express.Router();

router.post("/bar", async (_req, res) => {
    const alerts = ["Data Loss","VPN","Traffic"];
    const data = new Array(3).fill().map((_o, i) => ({
        alert: alerts[i],
        data: Math.floor(Math.random() * (50 - 10)) + 10,
    }));
    res.json(data);
});

router.post("/alarmas", async (_req, res) => {
    const alerts = ["Data Loss","VPN","Traffic","Mail Rejects","New Flows","High Total Traffic","Suspect UPD Activity"];
    const data = new Array(7).fill().map((_o, i) => ({
        alert: alerts[i],
        data: Math.floor(Math.random() * (50 - 10)) + 10,
    }));
    res.json(data);
});


router.post("/events", async (_req, res) => {
    const events = ["Brute Force Login","Fake Application Detected","High Traffic","Low Traffic","Spam Source","Suspect Data Loss","Timeout/udp"];
    const hosts=["Sales Marketing","Security","Developers","Testers","Human Resources","Warehouse","End User Devices","Domain Controllers","DHCP Servers","Multifunction"]
    var data=[];
    for(let i=0;i<10;i++)
    {
        data.push({
            First_active:new Date(new Date().valueOf() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            Source:hosts[Math.floor(Math.random()*hosts.length)],
            Source_Host:(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
            Target:hosts[Math.floor(Math.random()*hosts.length)],
            Host:(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
            Concern:Math.floor(Math.random() * 100000),
            Security:events[Math.floor(Math.random()*events.length)]
        })
    }
    res.json(data);
});


module.exports = router;