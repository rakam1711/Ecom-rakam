const Tag = require("../models/tagSchema.js");

const listTagAdmin = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("shopId", { name: 1 });
    return res.status(200).json({
      message: "successfully listed",
      status: true,
      data: tags,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/tags/listController",
    });
  }
};

module.exports = listTagAdmin;
