const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../../errorHandler/index.js");

const vendorModel = require("../../Modules/vendor/model/vendorSchema.js");
const JWTSECRET = process.env.JWTSECRET;

const secretKey = process.env.SECRETKEY;
const iv = process.env.IV;
const decrypt = async (encryptedToken) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedToken, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

const authenticateVendor = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>vendorAuthentication"
      );
    }
    const encryptedtoken = authHeader.split(" ")[1];
    const token = await decrypt(encryptedtoken);
    // console.log("Token:", token);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWTSECRET);
    } catch (err) {
      return new ApiError(
        "Please Login First.",
        401,
        "moddleware=>JWT=>vendorAuthentication"
      );
    }
    if (!decodedToken) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>vendorAuthentication"
      );
    }

    if (decodedToken.role === "VENDOR") {
      const Vendor = await vendorModel.findById(decodedToken?.id);
      if (!Vendor) {
       return res
          .json({ success: false, message: "vendor does not exist " })
          .status(404);
      }
      req.vendorId = decodedToken.id;
      req.role = "VENDOR";
      req.vendorr = Vendor
    }
    // ---------------------------------------------

    return next();
  } catch (err) {
    console.log(err.message, "src/Middleware/JWT/vendorAuthentication");
  }
};

module.exports = authenticateVendor;
