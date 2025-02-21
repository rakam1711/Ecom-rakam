const userroutes = require("express").Router();

const loginUser = require("../Modules/user/controller/loginUser.js");
const verifyOTP = require("../Modules/user/controller/verifyOTP.js");
const register = require("../Modules/user/controller/register.js");
const authenticateUser = require("../Middleware/JWT/userAuthentication.js");
const follow = require("../Modules/shopFollowers/controller/followController.js");
const addAddress = require("../Modules/address/controller/addAddressController.js");
const updateAddress = require("../Modules/address/controller/updateAddressController.js");
const deleteAddress = require("../Modules/address/controller/deleteAddressController.js");
const listAddress = require("../Modules/address/controller/listAddressController.js");
const search = require("../Modules/search/controller/searchdynamyc.js");
const shopbyCategoryid = require("../Modules/shop/controller/shopbyCategoryid.js");
const listBanner = require("../Modules/banner/controller/listBannerController.js");
const addToCart = require("../Modules/cart/controller/addToCart.js");
const listCartItems = require("../Modules/cart/controller/listCartItems.js");
const deleteCartItems = require("../Modules/cart/controller/deleteFromCart.js");
const updateCartItems = require("../Modules/cart/controller/updateCart.js");
const like = require("../Modules/shopLikes/controller/likeController.js");
const orderproducts = require("../Modules/orderProduct/controller/orderProduct.js");
const getMyOrder = require("../Modules/orderProduct/controller/getMyOrders.js");
const listAllShop = require("../Modules/shop/controller/listAllShops.js");
const shopByServiceId = require("../Modules/shop/controller/shopByServiceId.js");
const listshopTagByCategoryId = require("../Modules/shopTag/controller/listShopTagByCategoryId.js");
const popularShopHome = require("../Modules/shop/controller/popularShopHome.js");
const shopByShopId = require("../Modules/shop/controller/shopByShopId.js");
const UserproductByShopId = require("../Modules/product/controller/UserproductByShopId.js");
const productByProductId = require("../Modules/product/controller/productByProductId.js");
const myFollowingShop = require("../Modules/myFollowingShops/myFollowingShop.js");
const tagByShopId = require("../Modules/tags/controller/tagByShopId.js");
const listProductByCategory = require("../Modules/product/controller/listProductByCategory.js");
const listSubCatVarient = require("../Modules/subCategoryVarients/controller/listSubCatVarient.js");
const updateCartUnit = require("../Modules/cart/controller/updateUnitCart.js");
const listProductByServiceAndPopularity = require("../Modules/product/controller/listProductByServiceAndPopularity.js");
const shopbyCatSerSubCategory = require("../Modules/shop/controller/shopByCatSerSubCategory.js");

userroutes.post("/sendotp", loginUser);
userroutes.post("/verifyotp", verifyOTP);
userroutes.post("/register", register);

userroutes.post("/followUnfollow", authenticateUser, follow);
userroutes.post("/likeUnlike", authenticateUser, like);

userroutes.post("/addaddress", authenticateUser, addAddress);
userroutes.post("/updateaddress", authenticateUser, updateAddress);
userroutes.post("/deleteaddress", authenticateUser, deleteAddress);
userroutes.post("/listaddress", authenticateUser, listAddress);
userroutes.post("/popularshophome", popularShopHome);
userroutes.post("/shopbyCategoryid", shopbyCategoryid);
userroutes.post("/search", search);

userroutes.post("/listbanner", listBanner);

userroutes.post("/addtocart", authenticateUser, addToCart);
userroutes.post("/listcartitems", authenticateUser, listCartItems);
userroutes.post("/deletecartItems", authenticateUser, deleteCartItems);
userroutes.post("/updatecartItems", authenticateUser, updateCartItems);
userroutes.post("/updateCartUnit", authenticateUser, updateCartUnit);

userroutes.post("/orderproducts", authenticateUser, orderproducts);
userroutes.post("/getMyOrder", authenticateUser, getMyOrder);

userroutes.post("/listallshop", listAllShop);
userroutes.post("/shopbyserviceid", authenticateUser, shopByServiceId);
userroutes.post("/shopbyshopid", authenticateUser, shopByShopId);
userroutes.post("/shoptagbycategoryid", listshopTagByCategoryId);

userroutes.post("/listproductbyshopid", UserproductByShopId);
userroutes.post("/productbyproductid", productByProductId);
userroutes.post("/myfollowingshop", authenticateUser, myFollowingShop);
userroutes.post("/tagbyshopid", tagByShopId);
userroutes.post("/listProductByCategory", listProductByCategory);
userroutes.post("/listSubCatVarient", listSubCatVarient);
userroutes.post(
  "/listProductByServiceAndPopularity",
  listProductByServiceAndPopularity
);
userroutes.post("/shopbyCatSerSubCategory", shopbyCatSerSubCategory);

module.exports = userroutes;
