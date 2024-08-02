const mongoose = require("mongoose");

const admin = new mongoose.Schema(
  {
    number: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, default: "" },
    password: { type: String, required: true },
    profile_image: { type: String, default: null },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "admins",
  }
);

const Admin = mongoose.model("Admin", admin);
module.exports = Admin;
