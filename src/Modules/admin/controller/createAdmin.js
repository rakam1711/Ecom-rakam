const Admin = require("../model/adminSchema.js");
const bcryptjs = require("bcryptjs");

const createAdmin = async (req, res, next) => {
  try {
    const mustData = {
      number: req.body.number,
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    for (let key in mustData) {
      if (mustData[key] == undefined || mustData[key] == "") {
        throw new Error(`invalid field ${key}`);
      }
    }
    const salt = await bcryptjs.genSaltSync(2);
    const hashedPassword = await bcryptjs.hash(mustData.password, salt);

    const admin = Admin({
      number: mustData.number,
      email: mustData.email,
      name: mustData.name,
      password: hashedPassword,
    });

    await admin.save();
    return res.status(201).json({
      status: true,
      message: "admin created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/createAdmin",
    });
  }
};

module.exports = createAdmin;
