const express = require("express");
const router = express.Router();

router.post("/timeline", async (_req, res) => {
    res.json({ status: "OK" });
});

module.exports = router;
