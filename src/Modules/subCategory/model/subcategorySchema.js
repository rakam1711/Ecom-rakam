const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory

