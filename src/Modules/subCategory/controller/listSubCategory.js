const subCategorySchema = require("../model/subcategorySchema.js");

const listSubCategory = async (req, res) => {
  try {
    const { page, limit, categoryId } = req.body;
    const max = await subCategorySchema.countDocuments();
    const data = await subCategorySchema
      .find({ category: categoryId })
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data)
      return res.status(200).json({ status: true, message: "No data found" });
    const maxPage = Math.ceil(max / limit);
    return res.status(200).json({
      status: true,
      message: "successfully listing",
      data,
      maxPage: maxPage,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/subcategory/controller/listSubCategory",
    });
  }
};

module.exports = listSubCategory;
