const mongoose = require("mongoose");

const varientSchema = new mongoose.Schema({
  name: String,
  role: String,
  createdBy: String,
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subCategory" },
  placeHolder: String,
});

const varient = mongoose.model("Varientt", varientSchema);

module.exports = varient;
