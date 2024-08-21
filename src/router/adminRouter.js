const adminroutes = require("express").Router();

const authenticateUser = require("../Middleware/JWT/userAuthentication.js");

const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");
const getAllCategory = require("../Modules/category/controller/getAllCategory.js");
const updateCategory = require("../Modules/category/controller/updateCategory.js");
const deleteCategory = require("../Modules/category/controller/deleteCategory.js");
const createSubCategory = require("../Modules/subCategory/controller/createSubCategory.js");
const deleteSubCategory = require("../Modules/subCategory/controller/deleteSubCategory.js");
const listSubCategory = require("../Modules/subCategory/controller/listSubCategory.js");
const updateSubCategory = require("../Modules/subCategory/controller/updateSubCategory.js");

adminroutes.post("/adminlogin", loginAdmin);

adminroutes.post("/createcategory", authenticateUser, createCategory);
adminroutes.post("/deletecategory", authenticateUser, deleteCategory);
adminroutes.post("/listcategory", getAllCategory);
adminroutes.post("/updatecategory", authenticateUser, updateCategory);

adminroutes.post("/createsubcategory", authenticateUser, createSubCategory);
adminroutes.post("/deletesubcategory", authenticateUser, deleteSubCategory);
adminroutes.post("/listsubcategory", authenticateUser, listSubCategory);
adminroutes.post("/updatesubcategory", authenticateUser, updateSubCategory);

module.exports = adminroutes;
