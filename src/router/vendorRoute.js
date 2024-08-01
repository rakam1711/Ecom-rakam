const vendorRoute = require("express").Router();

// const loginUser = require("../user/controller/loginUser.js")
const register = require("../Modules/vendor/controller/register.js")
const findUserName = require("../Modules/vendor/controller/findUserName.js")
const login = require("../Modules/vendor/controller/login.js")

vendorRoute.post("/register", register);
vendorRoute.post("/findusername", findUserName);
vendorRoute.post("/login", login);


module.exports = vendorRoute;