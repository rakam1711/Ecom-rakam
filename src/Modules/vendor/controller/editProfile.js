const vendorModel = require("../model/vendorSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const BASE_URL = process.env.BASE_URL;
const editProfile = async (req, res) => {
  upload(req, res, async () => {
    try {
      const id = req.vendorId;
      const vendor = await vendorModel.findById({ _id: id });
      const mustdata = {
        ownerName: req.body.ownerName,
        shopName: req.body.shopName,
        number: req.body.number,
        numberAlternate: req.body.numberAlternate,
        category: req.body.category,
        subCategory: req.body.subCategory,
        email: req.body.email,
        password: req.body.password,
        gstORpan: req.body.gstORpan,
        bankName: req.body.bankName,
        accountHolderName: req.body.accountHolderName,
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
        branchName: req.body.branchName,
        categoryType: req.body.categoryType,
        paymentMode: req.body.paymentMode,
      };
      for (let key in data) {
        if (mustdata[key] == undefined || mustdata[key] == "") {
          delete mustdata[key];
        }
      }
      if (req.file) {
        deleteImage(vendor.image);
        mustdata.image = BASE_URL + req.file.path;
      }

      const data = await subCategorySchema.findByIdAndUpdate(
        { _id: id },
        mustdata,
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: "updated Sucessfully",
        updatedData: data,
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
