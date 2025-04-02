const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('./utils/logger.js');
const STATUS_CODE = require("./constants/statusCode.js");
const productRouting = require("./routing/product.js");
const logoutRouting = require("./routing/logout.js");
const homeRouting = require("./routing/home.js");
const http = require("http");
const config = require("./config");
const requestRouting = require("./routing/routing");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//
const requestListener = (request, response) => {
  requestRouting(request, response);
};

const server = http.createServer(requestListener);

server.listen(config.PORT);
//

app.use((request, response, next) => {
  console.log(`request: ${request.method} ${request.url}`);
  next(); 
  });
  


/*
  Zarejestruj middleware obsługujące poszczególne ścieżki.  
*/
/*
  Obsłuż stronę 404 – zwróć plik 404.html i zaloguj błąd.   
*/
/*
  Uruchom serwer i nasłuchuj na porcie z config.js.    
*/