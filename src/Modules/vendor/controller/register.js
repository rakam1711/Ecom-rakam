const vendorModel = require("../model/vendorSchema.js");
const bcryptjs = require("bcryptjs")
const register = async (req, res) => {
    try {
        const dataa = {
            ownerName: req.body.ownerName,
            shopName: req.body.shopName,
            number: req.body.number,
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        };
        const optionalDataa = {
            numberAlternate: req.body.numberAlternate,
            gstORpan: req.body.gstORpan,
        };

        const isUserName = await vendorModel.findOne({ userName: dataa.userName });
        if (isUserName) throw new Error("userName is already exist", 500);
        for (let key in dataa) {
            if (dataa[key] == "" || dataa[key] == undefined) {
                throw new Error(`${key} is require`);
            }
        }
        const salt = bcryptjs.genSaltSync(2)
        const hashPassword = bcryptjs.hashSync(dataa.password, salt)
        const data = new vendorModel({
            ownerName: dataa.ownerName,
            shopName: dataa.shopName,
            email: dataa.email,
            numberAlternate: optionalDataa.numberAlternate,
            number: dataa.number,
            userName: dataa.userName,
            gstORpan: optionalDataa.gstORpan,
            password: hashPassword,
        });
        const result = await data.save();
        return res.status(200).json({ status: true, message: "Successfully register" });

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message, location: "vendor/controller/register" })
    }
}

module.exports = register;