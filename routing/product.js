const fileSystem = require("fs");
const path = require("path");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage.js");
const express = require("express");
const router = express.Router(); 

router.get("/add", (req, res) => {
  response.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

router.post("/add", (req, res) => {
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

    fileSystem.writeFile(
      "product.txt",
      `${formData[0]}, ${formData[1]}`,
      (err) => {
        response.statusCode = STATUS_CODE.FOUND;
        response.setHeader("Location", "/product/new");

        return response.end();
      }
    );
  });
});

router.get("/new", (req, res) => {
  response.send();
});


const productRouting = (request, response) => {
  const { url, method } = request;

  if (url.includes("add") && method === "GET") {
    return renderAddProductPage(response);
  }

  if (url.includes("add") && method === "POST") {
    return addNewProduct(request, response);
  }

  if (url.includes("new")) {
    return renderNewProductPage(response);
  }

  console.warn(`ERROR: requested url ${url} doesn't exist.`);
  return;
};


const addNewProduct = (request, response) => {
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

    fileSystem.writeFile(
      "product.txt",
      `${formData[0]}, ${formData[1]}`,
      (err) => {
        response.statusCode = STATUS_CODE.FOUND;
        response.setHeader("Location", "/product/new");

        return response.end();
      }
    );
  });
};

module.exports = { productRouting };
