const userroutes = require("express").Router();

const loginUser = require("../Modules/user/controller/loginUser.js");
const verifyOTP = require("../Modules/user/controller/verifyOTP.js");
const register = require("../Modules/user/controller/register.js");
const authenticateUser = require("../Middleware/JWT/userAuthentication.js");
const follow = require("../Modules/shopFollowers/controller/followController.js");
const unfollow = require("../Modules/shopFollowers/controller/unfollowController.js");
const addAddress = require("../Modules/address/controller/addAddressController.js");
const updateAddress = require("../Modules/address/controller/updateAddressController.js");
const deleteAddress = require("../Modules/address/controller/deleteAddressController.js");
const listAddress = require("../Modules/address/controller/listAddressController.js");
const popularShop = require("../Modules/shop/controller/popularShop.js");
const search = require("../Modules/search/controller/searchdynamyc.js");
const shopbyCategoryid = require("../Modules/shop/controller/shopbyCategoryid.js");
const listBanner = require("../Modules/banner/controller/listBannerController.js");

userroutes.post("/sendotp", loginUser);
userroutes.post("/verifyotp", verifyOTP);
userroutes.post("/register", register);

userroutes.post("/follow", authenticateUser, follow);
userroutes.post("/unfollow", authenticateUser, unfollow);

userroutes.post("/addaddress", authenticateUser, addAddress);
userroutes.post("/updateaddress", authenticateUser, updateAddress);
userroutes.post("/deleteaddress", authenticateUser, deleteAddress);
userroutes.post("/listaddress", authenticateUser, listAddress);
userroutes.get("/popularshop", popularShop);
userroutes.get("/shopbyCategoryid", shopbyCategoryid);
userroutes.get("/search", search);

userroutes.post("/listbanner", listBanner);

module.exports = userroutes;
