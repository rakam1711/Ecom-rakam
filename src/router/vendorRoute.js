const vendorRoute = require("express").Router();

// const loginUser = require("../user/controller/loginUser.js")
const register = require("../Modules/vendor/controller/register.js");
const login = require("../Modules/vendor/controller/login.js");
const profile = require("../Modules/vendor/controller/profile.js");
const createShop = require("../Modules/shop/controller/createShopController.js");
const addProduct = require("../Modules/product/controller/addProductController.js");
const authenticateVendor = require("../Middleware/JWT/vendorAuthentication.js");
const deleteShop = require("../Modules/shop/controller/deleteShopControler.js");
const updateShop = require("../Modules/shop/controller/updateShopController.js");
const myshop = require("../Modules/shop/controller/myShopController.js");
const updateProduct = require("../Modules/product/controller/updateProductController.js");
const deleteProduct = require("../Modules/product/controller/deleteProductController.js");
const listProduct = require("../Modules/product/controller/listProductController.js");
const editProfile = require("../Modules/vendor/controller/editProfile.js");
const createTag = require("../Modules/tags/controller/createTagcontroller.js");
const listTag = require("../Modules/tags/controller/listTagController.js");
const updateTag = require("../Modules/tags/controller/updateTagController.js");
const deleteTag = require("../Modules/tags/controller/deleteTagController.js");

const subCategoryByCategoryId = require("../Modules/subCategory/controller/listSubCategory.js");

const myCategory = require("../Modules/category/controller/myCategory.js");
const listSubCategory = require("../Modules/subCategory/controller/listSubCategory.js");
const categoryByServiceId = require("../Modules/category/controller/categoryByServiceId.js");
const listProductBySubCategory = require("../Modules/product/controller/listProductBySubCategory.js");
const productById = require("../Modules/product/controller/productById.js");
const listBrand = require("../Modules/brand/controller/listBrand.js");

vendorRoute.post("/register", register);
vendorRoute.post("/login", login);
vendorRoute.post("/profile", authenticateVendor, profile);
vendorRoute.post("/editprofile", authenticateVendor, editProfile);

vendorRoute.post("/addproduct", authenticateVendor, addProduct);
vendorRoute.post("/updateproduct", authenticateVendor, updateProduct);
vendorRoute.post("/deleteproduct", authenticateVendor, deleteProduct);
vendorRoute.post("/listproduct", authenticateVendor, listProduct);
vendorRoute.post("/productbyid", productById);

vendorRoute.post(
  "/listProductBySubCategory",
  authenticateVendor,
  listProductBySubCategory
);

vendorRoute.post("/createshop", authenticateVendor, createShop);
vendorRoute.post("/myshop", authenticateVendor, myshop);
vendorRoute.post("/deleteshop", authenticateVendor, deleteShop);
vendorRoute.post("/updateshop", authenticateVendor, updateShop);

vendorRoute.post("/addtag", authenticateVendor, createTag);
vendorRoute.post("/updatetag", authenticateVendor, updateTag);
vendorRoute.post("/deletetag", authenticateVendor, deleteTag);
vendorRoute.post("/listtag", listTag);

vendorRoute.get("/mycategory", authenticateVendor, myCategory);
vendorRoute.post("/listsubcategory", listSubCategory);
vendorRoute.post("/categorybyserviceid", categoryByServiceId);

vendorRoute.get("/subCategoryByCategoryId", subCategoryByCategoryId);
vendorRoute.post("/listBrand", listBrand);

module.exports = vendorRoute;
