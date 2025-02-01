const Tag = require("../models/tagSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");

const BASE_URL = process.env.BASE_URL;

const createTag = async (req, res, next) => {
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
      const { tagName, description, shopId, categoryId } = req.body;
      console.log(description);
      const value = await Tag.findOne({ tagName: tagName });
      if (value) throw new Error("tag name already present");
      const data = Tag({
        tagName: tagName,
        description: description,
        shopId: shopId,
        categoryId: categoryId,
        image: req.file ? BASE_URL + req.file.path : undefined,
      });
      await data.save();
      return res.status(201).json({
        status: true,
        message: " tag created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: " tags/createTagController",
      });
    }
  });
};

module.exports = createTag;
