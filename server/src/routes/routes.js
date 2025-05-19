const express = require("express");
const promptController = require("../controllers/promptController");

const routes = express.Router();

router.post("api/prompt", promptController.sendText);

module.exports = routes;
