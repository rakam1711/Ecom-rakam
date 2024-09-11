const bannerSchema = require("../model/bannerSchema.js");
const deleteImageHandler = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const updateBanner = async (req, res) => {
  upload(req, res, async () => {
    try {
      const id = req.body.bannerId;
      if (!id) throw new Error("bannerId is required");
      const banner = await bannerSchema.findById({ _id: id });
      const obj = {};
      if (req.body.home) obj.name = req.body.home;
      if (req.body.status) obj.name = req.body.status;
      if (req.body.categoryId) obj.name = req.body.categoryId;
      if (req.file.path) {
        deleteImageHandler(banner?.image);
        obj.image = BASE_URL + req.file.path;
      }
      const data = await bannerSchema.findByIdAndUpdate({ _id: id }, obj, {
        new: true,
      });
      return res
        .status(200)
        .json({ status: true, message: "updated Sucessfully", data });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/updateCategory",
      });
    }
  });
};

module.exports = updateBanner;
