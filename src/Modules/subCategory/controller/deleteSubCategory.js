const subCategorySchema = require("../model/subcategorySchema");
const deleteSubCategory = async (req, res) => {
  try {
    const id = req.body.subCategoryId;
    if (!id) throw new Error("CategoryId is required");

    await subCategorySchema.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "delted Sucessfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Subcategory/controller/deleteSubCategory",
    });
  }
};

module.exports = deleteSubCategory;
