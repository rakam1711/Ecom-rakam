const Tag = require("../models/tagSchema.js");

const createTag = async (req, res, next) => {
  try {
    const { tagName, description } = req.body;
    const data = Tag({
      tagName: tagName,
      description: description,
    });
    await data.save();
    return res.status.json({
      status: true,
      message: "data created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      location: " tags/createTagController",
    });
  }
};

module.exports = createTag;
