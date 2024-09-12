const adminroutes = require("express").Router();

const authenticateAdmin = require("../Middleware/JWT/adminAuthentication.js");

const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");
const getAllCategory = require("../Modules/category/controller/getAllCategory.js");
const categoryByServiceId = require("../Modules/category/controller/categoryByServiceId.js");
const updateCategory = require("../Modules/category/controller/updateCategory.js");
const deleteCategory = require("../Modules/category/controller/deleteCategory.js");
const createSubCategory = require("../Modules/subCategory/controller/createSubCategory.js");
const deleteSubCategory = require("../Modules/subCategory/controller/deleteSubCategory.js");
const listSubCategory = require("../Modules/subCategory/controller/listSubCategory.js");
const updateSubCategory = require("../Modules/subCategory/controller/updateSubCategory.js");
const createBannerController = require("../Modules/banner/controller/createBannerController.js");

adminroutes.post("/adminlogin", loginAdmin);

adminroutes.post("/createcategory", authenticateAdmin, createCategory);
adminroutes.post("/deletecategory", authenticateAdmin, deleteCategory);
adminroutes.post("/listcategory", getAllCategory);
adminroutes.post("/categorybyserviceid", categoryByServiceId);
adminroutes.post("/updatecategory", authenticateAdmin, updateCategory);

adminroutes.post("/createsubcategory", authenticateAdmin, createSubCategory);
adminroutes.post("/deletesubcategory", authenticateAdmin, deleteSubCategory);
adminroutes.post("/listsubcategory", listSubCategory);
adminroutes.post("/updatesubcategory", authenticateAdmin, updateSubCategory);

adminroutes.post("/createbanner", authenticateAdmin, createBannerController);

module.exports = adminroutes;
