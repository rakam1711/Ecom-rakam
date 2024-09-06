const mongoose = require("mongoose");

const subVarientSchema = new mongoose.Schema({
  name: String,
  varient: { type: mongoose.Schema.Types.ObjectId, ref: "Varientt" },
});

const subVarient = mongoose.model("Varient", subVarientSchema);

module.exports = subVarient;
