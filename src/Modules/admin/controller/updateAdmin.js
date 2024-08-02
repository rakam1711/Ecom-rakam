const { ApiError } = require("../../../../errorHandler/index");
const Admin = require("../model/adminSchema");

const updateAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const admin = await Admin.findOne(req.admin._id);
    if (!admin) throw new ApiError("Invalid credential", 403);

    await Cart.findByIdAndUpdate(req.admin._id, data);
    return res.status(200).json({
      status: true,
      message: "Admin updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "src/Modules/admin/controller/updateAdmin",
    });
  }
};

module.exports = updateAdmin;
