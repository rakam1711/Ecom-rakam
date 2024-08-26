const mongoose = require("mongoose");

const varientSchema = new mongoose.Schema({
  name: String,
});

const varient = mongoose.model("Varient", varientSchema);

module.exports = varient;
