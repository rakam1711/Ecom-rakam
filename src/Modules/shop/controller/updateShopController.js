const Shop = require("../model/shopSchema.js");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const updateShop = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      contactInfo: req.body.contactInfo,
    };
    for (let key in data) {
      if (data[key] == undefined || data[key] == "") {
        delete data[key];
      }
    }
    await Shop.findOneAndUpdate({ owner: req.vendorId }, data, {
      new: true,
    });
    return res.status(200).json({
      status: true,
      message: "shop updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "src/Modules/Shop/controller/updateShop",
    });
  }
};

module.exports = updateShop;
