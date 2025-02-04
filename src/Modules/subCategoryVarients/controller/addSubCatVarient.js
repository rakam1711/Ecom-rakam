const subCategoryVarientModel = require("../model/subCategoryVarientSchema");

const addSubCatVarient = async (req, res) => {
  try {
    const { name, subCategoryId } = req.body;
    const subCategoryVarient = new subCategoryVarientModel({
      name,
      subCategoryId,
    });
    await subCategoryVarient.save();
    res.status(201).json({
      status: true,
      message: "Sub Category Varient added successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = addSubCatVarient;
