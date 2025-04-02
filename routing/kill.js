const logger = require('../utils/logger');
const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    logger.getProcessLog;
    response.redirect("/kill");
});

module.exports = { router };