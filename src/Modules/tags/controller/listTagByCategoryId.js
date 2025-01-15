const Tag = require("../models/tagSchema.js");
const listTagByCategoryId = async (req, res, next) => {
  try {
    const id = req.body.id;
    const tags = await Tag.find({ categoryId: id });
    return res.status(200).json({
      message: "successfully listed",
      status: true,
      data: tags,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/tags/TagByShopId.js",
    });
  }
};

module.exports = listTagByCategoryId;
