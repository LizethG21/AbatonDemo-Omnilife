const express = require("express");
const router = express.Router();

router.post("/line", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            server: Math.floor((Math.random() * (1 + 0.9)) * 100),
            cpu: Math.floor((Math.random() * (0.1 + 0.5)) * 100),
            ram: Math.floor((Math.random() * (0.5 + 0.7)) * 100),
            disco: Math.floor((Math.random() * (0.5 + 0.6)) * 100)
        };
        return o;
    });
    res.json(data);
});

router.post("/esx", async (_req, res) => {
    const d = new Date();
    var data = new Array(48).fill().map((_o, i) => {
        const o = {
            date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), i, 0, 0).valueOf(),
            cpu: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            totalcpu: Math.floor(100),
            ram: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100),
            totalram: Math.floor(100),
            disco: Math.floor((Math.random() * (0.45 - 0.5) + 0.5) * 100),
            totaldisco: Math.floor(100),
            cpuV: Math.floor((Math.random() * (0.1 - 0.3) + 0.3) * 100),
            totalcpuV: Math.floor(100),
            ramV: Math.floor((Math.random() * (0.3 - 0.5) + 0.5) * 100),
            totalramV: Math.floor(100)
        };
        return o;
    });
    res.json(data);
});

router.post("/circle", async (req, res) => {
    const typers = ["NFS","VMFS","NTFS","FAT"];
    const used = ["DS-BACKUP-COR","DS-DATOS-COR","SpringPathDS","Veeam_HVX"];
    const redes = ["DataNetwork","ManagementNet","vm-network","ReplicationNetwork"];
    const so = ["Oracle Linux","Other 2.6xLinux","RedHat Enterprise","Ubuntu-Linux(64bit)"];
    const data = new Array(4).fill().map((_o, i) => ({
        type: typers[i],
        used: used[i],
        redes: redes[i],
        so: so[i],
        datatype: Math.random() * (100 - 20) + 20,
        dataused: Math.random() * (100 - 20) + 20,
        dataredes: Math.random() * (100 - 20) + 20,
        dataso: Math.random() * (100 - 20) + 20
    }));
    res.json(data);
});

module.exports = router;