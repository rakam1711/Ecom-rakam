const categorySchema = require("../model/categorySchema");
const deleteCategory = async (req, res) => {
  try {
    const id = req.body.categoryId;
    if (!id) throw new Error("CategoryId is required");

    await categorySchema.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "delted Sucessfully" });
  } catch (err) {
    return res
      .status(500)
      .json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/deleteCategory",
      });
  }
};

module.exports = deleteCategory;
