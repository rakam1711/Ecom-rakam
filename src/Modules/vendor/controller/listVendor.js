const Vendor = require("../model/vendorSchema.js");

const listVendor = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const list = await Vendor.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "Vendor listed successfully",
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/listVendor",
    });
  }
};

module.exports = listVendor;
