const categorySchema = require("../model/categorySchema");

const getAllCategory = async (req, res) => {
    try {
        const { page, limit } = req.body;
        const max = await categorySchema.countDocuments();
        const data = await categorySchema.find().skip((page - 1) * limit).limit(limit);
        if (!data) return res.status(200).json({ status: true, message: "No data found" });
        const maxPage = Math.ceil(max / limit)
        return res.status(200).json({ status: true, message: "successfully listing", data, maxPage: maxPage })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message, location: "src/Modules/category/controller/getAllCategory" })
    }
}

module.exports = getAllCategory;