const vendorModel = require("../model/vendorSchema")

const profile = async (req, res) => {
    try {
        const data = await vendorModel.findOne({ _id: req.vendorId });
        return res.status(200).json({ status: true, message: "vendor Profile", data })
    } catch (err) {
        return res.status(400).json({ status: false, message: err.message, location: "sec/Modules/vendor/controller/profile" })
    }
}

module.exports = profile