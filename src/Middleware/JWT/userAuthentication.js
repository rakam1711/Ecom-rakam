const jwt = require("jsonwebtoken");
const { ApiError } = require("../../../errorHandler/index.js");
const JWTSECRET = process.env.JWTSECRET

const secretKey = process.env.SECRETKEY;
const iv = process.env.IV;
const decrypt = async (encryptedToken) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
module.exports = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return new ApiError("Not authenticated.", 401, "moddleware=>JWT=>userAuthentication")
    }
    const encryptedtoken = authHeader.split(" ")[1];
    const token = await decrypt(encryptedtoken);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWTSECRET);
    } catch (err) {
        return new ApiError("Please Login First.", 401, "moddleware=>JWT=>userAuthentication")
    }
    if (!decodedToken) {
        return new ApiError("Not authenticated.", 401, "moddleware=>JWT=>userAuthentication")
    }
    req.userId = decodedToken.admin_id ?? decodedToken.user_id;
    req.role = decodedToken.role;
    next();
};
