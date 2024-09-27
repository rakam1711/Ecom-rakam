const { ApiError } = require("../../../../errorHandler/index");
const Admin = require("../model/adminSchema");
const bcryptjs = require("bcryptjs");

const updateAdmin = async (req, res, next) => {
  try {
    const data = {
      number: req.body.number,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    for (let key in data) {
      if (data[key] == undefined || data[key] == "") {
        delete data[key];
      }
    }

    if (data.password) {
      const salt = bcryptjs.genSaltSync(2);
      const hashedPassword = await bcryptjs.hash(mustData.password, salt);
      data.password = hashedPassword;
    }
    const admin = await Admin.findOne({ _id: req.adminId });
    if (!admin) throw new ApiError("Invalid credential", 403);

    const sex = await Admin.findByIdAndUpdate(
      {
        _id: admin._id,
      },
      data,
      { new: true }
    );

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
