const Shop = require("../model/shopSchema");

const popularShop = async (req, res) => {
    try {
        const page = req.body.page || 1;
        const limit = req.body.limit || 1000;
        const skip = (page - 1) * limit;
        const count = Shop.countDocuments({ isPopular: true });
        const data = await Shop.find({ isPopular: true }).skip(skip).limit(limit);
        const maxpage = Math.ceil(count) || 0;
        return res.status(200).json({ status: true, result: data, maxPage: maxpage })

    } catch (err) {
        return res.status(400).json({ status: false, message: err.message, location: "src/Modules/shop/controller/popularShop" })
    }
}
module.exports = popularShop;