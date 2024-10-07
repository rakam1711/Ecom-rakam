const Shop = require("../model/shopSchema");

const shopByShopTag = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const tag = req.body.tagId;

    if (!tag) {
      throw new Error("Tag ID is required");
    }

    const shops = await Shop.find({ shopTag: { $in: [tag] } })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ status: true, result: shops });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/shopByShopTag",
    });
  }
};

module.exports = shopByShopTag;
