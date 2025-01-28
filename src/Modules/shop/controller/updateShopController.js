const Shop = require("../model/shopSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const updateShop = async (req, res, next) => {
  const safeParseArray = (data) => {
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        const parsedData = JSON.parse(data);
        return Array.isArray(parsedData) ? parsedData : [];
      } catch (error) {
        console.error("JSON parse error:", error);
        return [];
      }
    }
    return [];
  };

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
      const shop = await Shop.findOne({ owner: req.vendorId });
      if (!shop) {
        return res.status(404).json({
          status: false,
          message: "Shop not found.",
        });
      }

      const updates = {};
      if (req.body.name) updates.name = req.body.name;
      if (req.body.description) updates.description = req.body.description;
      if (req.body.categories) updates.categories = req.body.categories;
      if (req.body.subCategories)
        updates.subCategories = safeParseArray(req.body.subCategories);
      if (req.body.street) updates.street = req.body.street;
      if (req.body.city) updates.city = req.body.city;
      if (req.body.state) updates.state = req.body.state;
      if (req.body.postalCode) updates.postalCode = req.body.postalCode;
      if (req.body.phone) updates.phone = req.body.phone;
      if (req.body.email) updates.email = req.body.email;
      if (req.body.shopTag) updates.shopTag = safeParseArray(req.body.shopTag);
      if (req.body.shopTiming) updates.shopTiming = req.body.shopTiming;
      if (req.body.deliveryMethod)
        updates.deliveryMethod = req.body.deliveryMethod;
      if (req.file) updates.logo = BASE_URL + req.file.path;

      Object.assign(shop, updates);

      const updatedShop = await shop.save();

      return res.status(200).json({
        status: true,
        message: "Shop updated successfully.",
        data: updatedShop,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        location: "src/Modules/Shop/controller/updateShop",
      });
    }
  });
};

module.exports = updateShop;
