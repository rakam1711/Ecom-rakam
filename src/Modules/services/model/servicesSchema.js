const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
const Service = mongoose.model("service", serviceSchema);
module.exports = Service;
