const logger = require('../utils/logger');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/kill");
});

module.exports = { router };