const bannerSchema = require("../model/bannerSchema.js");
const BASE_URL = process.env.BASE_URL;
const upload = require("../../../Middleware/multer/multipleImageUpload.js");

const createBannerController = async (req, res, next) => {
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
      if (req.files) {
        let images = req.files.map((file) => BASE_URL + file.path);
        const { home, status, categoryId } = req.body;

        if (categoryId) {
          const data = new bannerSchema({
            image: images,
            home: home,
            status: status,
            categoryId: categoryId,
          });
        }

        await data.save();
      }

      return res.status(201).json({
        status: true,
        message: "banner successfully craeted",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/banner/controller/createBanner",
      });
    }
  });
};

module.exports = createBannerController;
