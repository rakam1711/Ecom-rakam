const vendorModel = require("../model/vendorSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const BASE_URL = process.env.BASE_URL;
const bcryptjs = require("bcryptjs");
const editProfile = async (req, res) => {
  upload(req, res, async () => {
    try {
      const id = req.body.vendorId;
      const vendor = await vendorModel.findById({ _id: id });
      const salt = bcryptjs.genSaltSync(2);
      const hashPassword = bcryptjs.hashSync(req.body.password, salt);
      const mustdata = {
        image: req.body.image,
        ownerName: req.body.ownerName,
        number: req.body.number,
        numberAlternate: req.body.numberAlternate,
        email: req.body.email,
        gstORpan: req.body.gstORpan,
        bankName: req.body.bankName,
        accountHolderName: req.body.accountHolderName,
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
        branchName: req.body.branchName,
        MSME: req.body.msme,
        password: hashPassword,
      };
      for (let key in mustdata) {
        if (mustdata[key] == undefined || mustdata[key] == "") {
          delete mustdata[key];
        }
      }
      if (req.file) {
        deleteImage(vendor.image);
        mustdata.image = BASE_URL + req.file.path;
      }

      await vendorModel.findByIdAndUpdate({ _id: id }, mustdata, {
        new: true,
      });

      return res.status(200).json({
        status: true,
        message: "updated Sucessfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/vendor/controller/editProfile",
      });
    }
  });
};

module.exports = editProfile;
