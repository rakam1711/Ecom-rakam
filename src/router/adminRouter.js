const adminroutes = require("express").Router();

const authenticateUser = require("../Middleware/JWT/userAuthentication.js");

const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");
const getAllCategory = require("../Modules/category/controller/getAllCategory.js");

adminroutes.post("/adminlogin", loginAdmin);
adminroutes.post("/createcategory", authenticateUser, createCategory);
adminroutes.post("/listcategory", getAllCategory);
module.exports = adminroutes;
