const bannerSchema = require("../model/bannerSchema.js");

const listBanner = async (req, res) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const data = await bannerSchema
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data)
      return res.status(200).json({ status: true, message: "No data found" });
    return res.status(200).json({
      status: true,
      message: "successfully listing",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Banner/controller/listBannerController",
    });
  }
};

module.exports = listBanner;
