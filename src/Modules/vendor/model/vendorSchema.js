const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
    number: { type: Number, require: true, unique: true },
    numberAlternate: { type: Number, unique: true },
    ownerName: { type: String, require: true },
    shopName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    userName: { type: String, require: true, unique: true },
    gstORpan: { type: String },
    category: [],
    subCategory: []


}, {
    timestamps: true,
    collection: "vendor"
});
const vendorModel = mongoose.model("vender", vendorSchema);
module.exports = vendorModel;