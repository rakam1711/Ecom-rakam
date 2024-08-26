const mongoose = require("mongoose");

const subVarientSchema = new mongoose.Schema({
  name: String,
});

const subVarient = mongoose.model("Varient", subVarientSchema);

module.exports = subVarient;
