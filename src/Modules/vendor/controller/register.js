const vendorModel = require("../model/vendorSchema.js");
const bcryptjs = require("bcryptjs");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const register = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const dataa = {
        ownerName: req.body.ownerName,
        number: req.body.number,
        password: req.body.password,
        email: req.body.email,
        image: req.file ? req.file.path : undefined,
        service: req.body.serviceId
      };
      const optionalDataa = {
        numberAlternate: req.body.numberAlternate,
        gstORpan: req.body.gstORpan,
      };

      const isUser = await vendorModel.findOne({
        $or: [{ number: dataa.number }, { email: dataa.email }],
      });
      if (isUser) throw new Error("vendor is already exist", 500);

      for (let key in dataa) {
        if (dataa[key] == "" || dataa[key] == undefined) {
          throw new Error(`${key} is require`);
        }
      }
      const salt = bcryptjs.genSaltSync(2);
      const hashPassword = bcryptjs.hashSync(dataa.password, salt);
      const data = new vendorModel({
        ownerName: dataa.ownerName,
        email: dataa.email,
        numberAlternate: optionalDataa.numberAlternate,
        number: dataa.number,
        gstORpan: optionalDataa.gstORpan,
        password: hashPassword,
        image: BASE_URL + dataa.image,
        service: dataa.service,
      });
      const result = await data.save();
      return res
        .status(200)
        .json({ status: true, message: "Successfully register", data: result });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "vendor/controller/register",
      });
    }
  });
};

module.exports = register;
