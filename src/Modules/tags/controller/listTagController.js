const Tag = require("../models/tagSchema.js");

const listTag = async (req, res, next) => {
  try {
    const id = req.body.id;
    console.log("id", id);
    const tags = await Tag.find();
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

module.exports = listTag;
