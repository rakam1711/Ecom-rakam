const User = require("../model/userSchema.js");

const searchUser = async (req, res, next) => {
  try {
    let limit = req.body.limit || 11;
    let page = req.body.page || 1;
    const input = req.body.input || "";

    let pipeline = [];

    if (input.trim() !== "") {
      let numberMatch = {};
      if (!isNaN(input)) {
        numberMatch = { number: parseInt(input) };
      }

      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: input, $options: "i" } },
            { email: { $regex: input, $options: "i" } },
            numberMatch,
          ],
        },
      });
    }

    let skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const users = await User.aggregate(pipeline);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      status: true,
      message: "User listed successfully",
      data: users,
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
