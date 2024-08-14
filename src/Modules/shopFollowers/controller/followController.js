const followerSchema = require("../model/followerSchema.js");

const follow = async (req, res, next) => {
  try {
    if (!req.userId) throw new Error("userId is not provided ");
    if (!req.body.shopId) throw new Error("userId is not provided in req.body");

    const data = await followerSchema({
      userId: req.userId,
      shopId: req.body.shopId,
    });
    await data.save();
    return res.status(200).json({
      status: true,
      message: "follow successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/shopFollowers/controller/followController",
    });
  }
};

module.exports = follow;
