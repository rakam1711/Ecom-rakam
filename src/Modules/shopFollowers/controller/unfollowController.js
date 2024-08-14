const followerSchema = require("../model/followerSchema.js");

const unfollow = async (req, res, next) => {
  try {
    if (!req.userId) throw new Error("userId is not provided ");
    if (!req.body.shopId) throw new Error("userId is not provided in req.body");

    await followerSchema.findOneAndDelete({
      userId: req.userId,
      shopId: req.body.shopId,
    });
    return res.status(200).json({
      status: true,
      message: "unfollow Successfully",
    });
  } catch (err) {
    return res.satus(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/shopFollowers/controller/unfollowController",
    });
  }
};

module.exports = unfollow;
