const subCategoryVarientModel = require("../model/subCategoryVarientSchema");

const listSubCatVarient = async (req, res) => {
  try {
    const subCategoryId = req.body.subCategoryId;
    const subCategoryVarient = await subCategoryVarientModel.find({
      subCategoryId: subCategoryId,
    });
    res.status(200).json({
      status: true,
      message: "Sub Category Varient List",
      data: subCategoryVarient,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = listSubCatVarient;
