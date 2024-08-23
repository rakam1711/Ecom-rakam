const productRouter = require("express").Router();

const addProduct = require("../Modules/user/controller/loginUser.js");


productRouter.post("/addProduct", addProduct);

module.exports = productRouter;
