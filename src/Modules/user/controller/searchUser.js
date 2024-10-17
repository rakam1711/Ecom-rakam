const User = require("../model/userSchema.js");

const searchUser = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const user = await User.find({
      name: { $regex: `${key}`, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "User listed successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/User/controller/listUser",
    });
  }
};

module.exports = searchUser;
