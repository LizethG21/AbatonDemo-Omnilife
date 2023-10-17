const express = require("express");
const router = express.Router();

router.get("/", (_req, res, _next) => {
    res.end("Nothing to see here.");
});

router.use("/atntime", require("./dash/atntime"));
router.use("/stealthwatch", require("./demo/stealthwatch"));
router.use("/appdynamics", require("./demo/appdynamics"));
router.use("/vmware", require("./demo/vmware"));
router.use("/ciscoprime", require("./demo/ciscoprime"));
router.use("/vpn", require("./demo/vpn"));
router.use("/dna", require("./demo/dna"));
router.use("/Infra", require("./demo/Infra"));


//incident
router.use("/abandon", require("./dash/abandon"));
router.use("/inventory", require("./dash/inventory"));
router.use("/incident", require("./dash/incident"));
router.use("/dummy", require("./dash/dummy"));
router.use("/incident", require("./dash/incident"));
router.use("/invent", require("./dash/invent"));
router.use("/service", require("./dash/service"));
router.use("/contacts", require("./dash/contacts"));


module.exports = router;
