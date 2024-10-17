const Admin = require("../model/adminSchema.js");

const searchAdmin = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const key = req.body.name;
    const admin = await Admin.find({
      name: { $regex: `${key}`, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Admin listed successfully",
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/listAdmin",
    });
  }
};

module.exports = searchAdmin;
