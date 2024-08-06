const Admin = require("../model/adminSchema.js");

const listAdmin = async (req, res, next) => {
  try {
    const list = await Admin.find();
    return res.status(200).json({
      status: true,
      message: "Admin listed successfully",
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/listAdmin",
    });
  }
};

module.exports = listAdmin;
