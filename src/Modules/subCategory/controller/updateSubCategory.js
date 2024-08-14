const subCategorySchema = require("../model/subcategorySchema");
const updateSubCategory = async (req, res) => {
  try {
    const id = req.body.subCategoryId;
    const data = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.categoryId,
    };
    for (let key in data) {
      if (data[key] == undefined || data[key] == "") {
        delete data[key];
      }
    }

    await subCategorySchema.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res
      .status(200)
      .json({ status: true, message: "updated Sucessfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/subcategory/controller/updateSubCategory",
    });
  }
};

module.exports = updateSubCategory;
