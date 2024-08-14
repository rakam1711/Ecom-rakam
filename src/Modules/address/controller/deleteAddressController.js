const Address = require("../model/productSchema.js");

const deleteAddress = async (req, res, next) => {
  try {
    const id = req.body.id;
    const address = await Address.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Address/controller/deleteAddressController.js",
    });
  }
};

module.exports = deleteAddress;
