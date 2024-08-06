const vendorRoute = require("express").Router();

// const loginUser = require("../user/controller/loginUser.js")
const register = require("../Modules/vendor/controller/register.js");
const login = require("../Modules/vendor/controller/login.js");
const createShop = require("../Modules/shop/controller/createShopController.js");
const addProduct = require("../Modules/product/controller/addProductController.js");

vendorRoute.post("/register", register);
vendorRoute.post("/login", login);
vendorRoute.post("/createshop", createShop);
vendorRoute.post("/addProduct", addProduct);

module.exports = vendorRoute;
