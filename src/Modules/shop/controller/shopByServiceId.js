const Shop = require("../model/shopSchema");

const shopByServiceId = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const serviceId = req.body.serviceId;

    const shops = await Shop.find({service:serviceId})
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ status: true, result: shops });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/listAllShop",
    });
  }
};

module.exports = shopByServiceId;
