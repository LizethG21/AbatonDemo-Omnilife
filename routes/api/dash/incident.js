const express = require("express");
const router = express.Router();

router.post("/circles", async (_req, res) => {
    const data = {
        cat: [
            "Desktop",
            "Laptop",
            "Impresora",
            "Periférico",
            "Tableta",
            "Smartphone",
            "Otro"
        ].map(o => ({
            label: o,
            count: Math.floor(Math.random() * 30 + 70)
        })),

        res: [
            "Reseteo de Passwords – Control de Accesos",
            "Bloqueo de cuentas – Control de Accesos",
            "Acceso de credenciales – Seguridad Física",
            "Portal Intranet – Recursos Humanos",
            "Acceso a Aplicaciones – Control de Accesos",
            "Acceso a base de datos – Soporte Base de Datos",
            "Cambio de equipo – Regional en sitio",
            "Falla de hardware – Regional en sitio",
            "Instalación de antivirus – Regional en sitio",
            "Actualizaciones de Antivirus – Seguridad Antivirus"
        ].map(o => ({
                label: o,
                count: Math.floor(Math.random() * 30 + 70)
            })),

        status: ["CRÍTICO", "ALTO", "BAJO", "RESUELTO"].map((o, i) => ({
            label: o,
            count: Math.floor(((Math.random() * (i * i + 1)) / 50) * 100)
        }))
    };
    res.json(data);
});

router.post("/byseverity", async (_res, res) => {
    const data = ["Severidad 1", "Severidad 2", "Severidad 3"].map(o => ({
        label: o,
        count: Math.floor(Math.random() * 300)
    }));
    res.json(data);
});

router.post("/bystatus", async (_req, res) => {
    const data = [
        "Nuevo",
        "Asignado",
        "En progreso",
        "Pendiente",
        "Resuelto",
        "Cerrado",
        "Cancelado"
    ].map(o => ({
        label: o,
        count: Math.floor(Math.random() * 200)
    }));
    res.json(data);
});

router.post("/bytype", async (_re, res) => {
    const data = [
        "Restauración del servicio de usuario",
        "Solicitud de servicio al usuario",
        "Restauración de infraestructura",
        "Evento de infraestructura"
    ].map(o => ({
        label: o,
        count: Math.floor(Math.random() * 250) + 1
    }));
    data.sort((a, b) => b.count - a.count);
    res.json(data);
});

router.post("/bysource", async (_re, res) => {
    const data = [
        "Direct input",
        "Email",
        "Fax",
        "Self-Service",
        "Systems Management",
        "Phone",
        "Voice Mail",
        "Walk In",
        "Web",
        "Other"
    ].map(o => ({
        label: o,
        count: Math.floor(Math.random() * 100) + 1
    }));
    //sort descending, put "Other" at the end
    data.sort((a, b) =>
        a.label == "Other"
            ? Number.MAX_VALUE
            : b.label == "Other"
            ? Number.MIN_VALUE
            : b.count - a.count
    );
    res.json(data);
});

router.post("/byseveritylevel", async (_req, res) => {
    const names = ["Severidad 1","Severidad 2","Severidad 3","Severidad 4"];
    const data = new Array(4).fill().map((_o, i) => {
        const o = {
            label: names[i],
            actual: Math.floor(Math.random()*(150-23+1)+23),
            total: Math.floor(Math.random()*(300-23+1)+23)
        };
        return o;
    });
    res.json(data);

});

module.exports = router;
