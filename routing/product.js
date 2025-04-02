const fileSystem = require("fs");
const path = require("path");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage.js");
const express = require("express");
const router = express.Router(); 

router.get("/add", (request, response) => {
  response.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

router.post("/add", (request, response) => {
  const body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    });

    fileSystem.writeFile("product.txt",`${formData[0]}, ${formData[1]}`,(err) => {
        if (err) {
          console.error("Error");
          return;
        }
        response.statusCode = STATUS_CODE.FOUND;
        response.setHeader("Location", "/product/new");

        return response.end();
      }
    );
  });
});

router.get("/new", (request, response) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error");
        return;
    }
    response.send(renderNewProductPage(data));
  });
});

module.exports = { router };
