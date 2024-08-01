const userroutes = require("express").Router();

const loginUser = require("../Modules/user/controller/loginUser.js");
const verifyOTP = require("../Modules/user/controller/verifyOTP.js");
const register = require("../Modules/user/controller/register.js");

userroutes.post("/sendotp", loginUser);
userroutes.post("/verifyotp", verifyOTP);
userroutes.post("/register", register);


module.exports = userroutes;