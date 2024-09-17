const Shop = require("../model/shopSchema");
const Follower = require("../../shopFollowers/model/followerSchema.js");

const shopbyCategoryid = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;
    const catId = req.body.Categoryid;
    const count = await Shop.countDocuments({ categories: catId });
    const result = await Shop.find({ categories: catId })
      .skip(skip)
      .limit(limit);
    const shopId = result._id;
    const followers = await Follower.countDocuments({ shopId });
    console.log(followers);
    const pagination = {
      maxCount: Math.ceil(count),
      page: page,
      limit: limit,
    };
    return res.status(200).json({ status: true, result, pagination });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/shopbycategoryid",
    });
  }
};

module.exports = shopbyCategoryid;
