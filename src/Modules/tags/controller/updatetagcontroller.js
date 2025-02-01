const Tag = require("../models/tagSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");

const BASE_URL = process.env.BASE_URL;

const updateTag = async (req, res, next) => {
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
      const data = {
        name: req.body.name,
        tagid: req.body.tagid,
      };
      const result = await Tag.find({ _id: data.tagid });
      if (req.file) {
        deleteImage(result.image);
        data.image = BASE_URL + req.file.path;
      }
      await Tag.findByIdAndUpdate({ _id: data.tagid }, data, {
        new: true,
      });
      return res.status(200).json({
        message: "tag updated successfully",
        status: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        location: " tags/updatetags",
      });
    }
  });
};
module.exports = updateTag;
