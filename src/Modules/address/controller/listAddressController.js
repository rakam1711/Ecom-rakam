const Address = require("../model/addressSchema.js");

const listAddress = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const address = await Address.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "Address listed successfully",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Address/controller/listAddressController.js",
    });
  }
};

module.exports = listAddress;
