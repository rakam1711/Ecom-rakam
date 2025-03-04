const Shop = require("../model/shopSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const safeParseArray = (data) => {
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      const parsedData = JSON.parse(data);
      console.log(parsedData, "data")
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("JSON parse error:", error);
      return [];
    }
  }
  // return [];
};
const updateShopByAdmin = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }

    try {
      if (req.role == "ADMIN" || req.role == "SUBADMIN") {
        const shop = await Shop.findById({ _id: req.body.id });
        if (!shop) {
          return res.status(404).json({
            status: false,
            message: "Shop not found.",
          });
        }

        const fieldsToUpdate = {
          name: req.body.name,
          description: req.body.description,
          categories: req.body.categories,
          subCategories: safeParseArray(req.body.subCategories),
          // subCategories: JSON.parse(req.body.subCategories),
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          phone: req.body.phone,
          email: req.body.email,
          isActive: req.body.isActive,
          verifiedBy: req.adminId,
          logo: req.file ? BASE_URL + req.file.path : undefined,
          shopTag: safeParseArray(req.body.shopTag),
          // shopTag: JSON.parse(req.body.shopTag),
          shopTiming: req.body.shopTiming,
          deliveryMethod: req.body.deliveryMethod,
        };

        for (const [key, value] of Object.entries(fieldsToUpdate)) {
          if (value !== undefined) {
            shop[key] = value;
          }
        }

        const updatedShop = await shop.save();

        return res.status(200).json({
          status: true,
          message: "Shop updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        location: "src/Modules/Shop/controller/updateShopByAdmin",
      });
    }
  });
};

module.exports = updateShopByAdmin;
