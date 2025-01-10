const mongoose = require("mongoose");

const subVarientSchema = new mongoose.Schema({
  name: [],
  varient: { type: mongoose.Schema.Types.ObjectId, ref: "Varientt" },
  role: { type: String },
  createdBy: String,
  code: String,
});

const subVarient = mongoose.model("subVarient", subVarientSchema);

module.exports = subVarient;
