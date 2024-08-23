const vendorRoute = require("express").Router();

// const loginUser = require("../user/controller/loginUser.js")
const register = require("../Modules/vendor/controller/register.js");
const login = require("../Modules/vendor/controller/login.js");
const createShop = require("../Modules/shop/controller/createShopController.js");
const addProduct = require("../Modules/product/controller/addProductController.js");
const authenticateUser = require("../Middleware/JWT/userAuthentication.js");
const deleteShop = require("../Modules/shop/controller/deleteShopControler.js");
const updateShop = require("../Modules/shop/controller/updateShopController.js");
const listShop = require("../Modules/shop/controller/listShopController.js");
const updateProduct = require("../Modules/product/controller/updateProductController.js");
const deleteProduct = require("../Modules/product/controller/deleteProductController.js");
const listProduct = require("../Modules/product/controller/listProductController.js");
const editProfile = require("../Modules/vendor/controller/editProfile.js");

vendorRoute.post("/register", register);
vendorRoute.post("/login", login);
vendorRoute.post("/editprofile", editProfile);

vendorRoute.post("/addproduct", authenticateUser, addProduct);
vendorRoute.post("/updateproduct", authenticateUser, updateProduct);
vendorRoute.post("/deleteproduct", authenticateUser, deleteProduct);
vendorRoute.post("/listproduct", authenticateUser, listProduct);

vendorRoute.post("/createshop", authenticateUser, createShop);
vendorRoute.post("/listshop", authenticateUser, listShop);
vendorRoute.post("/deleteshop", authenticateUser, deleteShop);
vendorRoute.post("/updateshop", authenticateUser, updateShop);

module.exports = vendorRoute;
