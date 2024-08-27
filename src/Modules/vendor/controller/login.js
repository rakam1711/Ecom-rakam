const vendorModel = require("../model/vendorSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const { encrypt } = require("../../../Middleware/encryption.js");
const login = async (req, res) => {
  try {
    const body = {
      number: req.body.number,
      password: req.body.password,
    };
    for (let key in body) {
      if (body[key] == "" || body[key] == undefined) {
        throw new Error(`${key} is require`);
      }
    }
    const user = await vendorModel.findOne({ number: body.number }).select({password:true});
    if (!user) throw new Error("invalid userName");
    const isValid = bcryptjs.compareSync(body.password, user.password);
    if (!isValid) throw new Error("invalid Password");
    const newToken = jwt.sign({ id: user.id, role: "VENDOR" }, jwtSecret);
    const token = await encrypt(newToken);
    return res
      .status(200)
      .json({ status: true, message: "login succefully", user, token });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "vendor/controller/login",
    });
  }
};
module.exports = login;
