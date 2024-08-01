const vendorModel = require("../model/vendorSchema");

const findUserName = async (req, res) => {
    try {
        const userName = req.body.userName;
        const isExist = await vendorModel.findOne({ userName: userName });
        if (isExist) throw new Error("userName already exist");

        return res.status(200).json({ status: true, message: "you can you this userName" })


    } catch (err) {
        return res.status(500).json({ status: false, message: err.message, location: "vendor/controller/findUserName" })
    }

}

module.exports = findUserName;