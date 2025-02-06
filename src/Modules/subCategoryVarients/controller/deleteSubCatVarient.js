const subCategoryVarientModel = require("../model/subCategoryVarientSchema");

const deleteSubCatVarient = async (req, res) => {
  try {
    const { id } = req.body;
    await subCategoryVarientModel.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Sub Category Varient deleted successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = deleteSubCatVarient;
