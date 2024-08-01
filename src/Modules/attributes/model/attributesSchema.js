const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({

    image: {
        type: String
    },
    categoryId: {
        type: String
    },
    subCategoryId: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    attributes: {
        type: Object
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });




const serviceSchema = mongoose.model("Category", attributeSchema);


module.exports = serviceSchema
