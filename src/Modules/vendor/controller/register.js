const vendorModel = require("../model/vendorSchema.js");
const bcryptjs = require("bcryptjs");
const register = async (req, res) => {
  try {
    const dataa = {
      ownerName: req.body.ownerName,
      shopName: req.body.shopName,
      number: req.body.number,
      password: req.body.password,
      email: req.body.email,
      category: req.body.category,
      subCategory: req.body.subCategory,
    };
    const optionalDataa = {
      numberAlternate: req.body.numberAlternate,
      gstORpan: req.body.gstORpan,
    };

    const isUser = await vendorModel.findOne({ number: dataa.number });
    if (isUser) throw new Error("Number is already exist", 500);
    for (let key in dataa) {
      if (dataa[key] == "" || dataa[key] == undefined) {
        throw new Error(`${key} is require`);
      }
    }
    const salt = bcryptjs.genSaltSync(2);
    const hashPassword = bcryptjs.hashSync(dataa.password, salt);
    const data = new vendorModel({
      ownerName: dataa.ownerName,
      shopName: dataa.shopName,
      email: dataa.email,
      numberAlternate: optionalDataa.numberAlternate,
      number: dataa.number,
      gstORpan: optionalDataa.gstORpan,
      password: hashPassword,
      category: dataa.category,
      subCategory: dataa.subCategory,
    });
    const result = await data.save();
    return res
      .status(200)
      .json({ status: true, message: "Successfully register" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "vendor/controller/register",
    });
  }
};

module.exports = register;
