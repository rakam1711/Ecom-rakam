const Product = require("../../product/model/productSchema");

const searchdynamic = async (req, res) => {
    try {
        const item = req.body.searchItem;
        const pipeline = await getPipeline(item);
        const result = await Product.aggregate(pipeline);
        return res.status(200).json({ status: true, result })
    } catch (e) {
        return res.status(400).json({ status: false, message: e.message, location: "src/Modules/search/controller/searchdynamic" })
    }
}

module.exports = searchdynamic

const getPipeline = async (item) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "categories", // Join the Category collection
                    localField: "category", 
                    foreignField: "_id", 
                    as: "categoryData"
                }
            },
            {
                $lookup: {
                    from: "subcategories", // Join the SubCategory collection
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategoryData"
                }
            },
            {
                $match: {
                    $or: [
                        { name: { $regex: item, $options: "i" } }, // Case-insensitive search on product name
                        { description: { $regex: item, $options: "i" } }, // Case-insensitive search on product description
                        { "categoryData.name": { $regex: item, $options: "i" } }, // Search on category name
                        { "subCategoryData.name": { $regex: item, $options: "i" } }, // Search on subcategory name
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    categoryData: 1,
                    subCategoryData: 1,
                    price: 1,
                    stock: 1,
                    images: 1,
                    specialLabel: 1,
                    availableForSubscription: 1,
                    deliveryTimeline: 1,
                    rating: 1,
                    numRatings: 1
                }
            }
        ];

        return pipeline;
    } catch (e) {
        throw e;
    }
};
