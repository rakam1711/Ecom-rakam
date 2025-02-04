const mongoose = require("mongoose");

const subCategoryVarient = new mongoose.Schema({
  name: {
    type: String,
  },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "subCategory" },
});

const subCategoryVarientModel = mongoose.model(
  "subCategoryVarient",
  subCategoryVarient
);
module.exports = subCategoryVarientModel;
