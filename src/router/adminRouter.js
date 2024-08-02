const adminroutes = require("express").Router();

const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");

adminroutes.post("/adminlogin", loginAdmin);
adminroutes.post("/createcategory", createCategory);
module.exports = adminroutes;
