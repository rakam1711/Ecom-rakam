const productRouter = require("express").Router();

const addProduct = require("../Modules/product/controller/AddNewProduct.js");


productRouter.post("/addProduct", addProduct);

module.exports = productRouter;
