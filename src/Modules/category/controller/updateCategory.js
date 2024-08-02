const categorySchema = require("../model/categorySchema");
const updateCategory = async (req, res) => {
    try {
        const id = req.body.categoryId;
        if (!id) throw new Error("CategoryId is required");
        const obj = {};
        if (req.body.name) obj.name = req.body.name;
        const data = await categorySchema.findByIdAndUpdate({ _id: id }, obj, { new: true });
        return res.status(200).json({ status: true, message: "updated Sucessfully", data });
    } catch (err) { return res.status(500).json({ status: false, message: err.message, location: "src/Modules/category/controller/updateCategory" }) }
}

module.exports = updateCategory;