const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('./utils/logger.js');
const { STATUS_CODE } = require("./constants/statusCode.js");
const productRouting = require("./routing/product.js");
const logoutRouting = require("./routing/logout.js");
const homeRouting = require("./routing/home.js");
const killRouting = require("./routing/kill.js");
const config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((request, response, next) => {
  logger.getInfoLog;
  next(); 
});
  
app.use("/product", (request, response, next) => {
  response.send(productRouting.router);
});

app.use("/logout", (request, response, next) => {
  response.send(logoutRouting.router);
});

app.use("/kill", (request, response, next) => {
  response.send(killRouting.router);
});

app.use("/", (request, response, next) => {
  response.send(homeRouting.router);
});

app.use((request, response, next) => {
  response.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, "./views", "404.html"))
  logger.getErrorLog;
});

app.listen(config.PORT, () => {
  console.log(`Server works on ${PORT}`);
});