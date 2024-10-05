const Shop = require("../model/shopSchema");
const mongoose = require("mongoose");

const popularShop = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 1000;
    const service = req.body.serviceId;
    const category = req.body.categoryId;
    const skip = (page - 1) * limit;

    const pipeline = await getPipeline(service, category);
    const data = await Shop.aggregate(pipeline).skip(skip).limit(limit);

    const count = await Shop.countDocuments({ isPopular: true });
    const maxPage = Math.ceil(count / limit) || 0;

    return res.status(200).json({ status: true, result: data, maxPage });
  } catch (err) {
    return res
      .status(400)
      .json({
        status: false,
        message: err.message,
        location: "src/Modules/shop/controller/popularShop",
      });
  }
};

module.exports = popularShop;

const getPipeline = async (service, category) => {
  const matchStage = { isPopular: true };

  if (service) {
    matchStage.service =new mongoose.Types.ObjectId(service);
  }

  if (category) {
    matchStage.categories =new mongoose.Types.ObjectId(category);
  }

  const pipeline = [{ $match: matchStage }];

  return pipeline;
};
