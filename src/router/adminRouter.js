const adminroutes = require("express").Router();

const authenticateUser = require("../Middleware/JWT/userAuthentication.js");

const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");
const getAllCategory = require("../Modules/category/controller/getAllCategory.js");
const updateCategory = require("../Modules/category/controller/updateCategory.js");
const createSubCategory = require("../Modules/subCategory/controller/createSubCategory.js");

adminroutes.post("/adminlogin", loginAdmin);
adminroutes.post("/createcategory", authenticateUser, createCategory);
adminroutes.post("/createsubcategory", authenticateUser, createSubCategory);
adminroutes.post("/listcategory", getAllCategory);
adminroutes.post("/updatecategory", updateCategory);
module.exports = adminroutes;
