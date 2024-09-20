const Product = require("../../product/model/productSchema");
const mongoose = require("mongoose");
const searchdynamic = async (req, res) => {
    try {
        const item = req.body.searchItem;
        const tags = req.body.tags;
        const category = req.body.catrgories;
        const pipeline = await getPipeline(item, category, tags);

        // Aggregate the products using the pipeline
        const products = await Product.aggregate(pipeline);

        // Extract categories and shops from the result
        const categories = products.flatMap(p => p.categoryData);
        const shops = products.flatMap(p => p.shopData);

        // Remove duplicate categories based on _id
        const uniqueCategories = categories.filter(
            (category, index, self) =>
                index === self.findIndex((c) => c._id.toString() === category._id.toString())
        );

        // Remove duplicate shops based on _id
        const uniqueShops = shops.filter(
            (shop, index, self) =>
                index === self.findIndex((s) => s._id.toString() === shop._id.toString())
        );

        return res.status(200).json({
            status: true,
            products,
            categories: uniqueCategories,
            shops: uniqueShops
        });
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message,
            location: "src/Modules/search/controller/searchdynamic"
        });
    }
};



module.exports = searchdynamic

const getPipeline = async (item, category, tags) => {
    try {
        // Create a base match object
        let matchConditions = [];

        // If search item is provided, add search-related match conditions
        if (item) {
            matchConditions.push({
                $or: [
                    { name: { $regex: item, $options: "i" } }, // Case-insensitive search on product name
                    { description: { $regex: item, $options: "i" } }, // Case-insensitive search on product description
                    { "categoryData.name": { $regex: item, $options: "i" } }, // Search in category name
                    { "subCategoryData.name": { $regex: item, $options: "i" } }, // Search in subcategory name
                    { "shopData.name": { $regex: item, $options: "i" } } // Search in shop name
                ]
            });
        }

        // If category is provided, add category match condition
        if (category && category.length > 0) {
            matchConditions.push({
                category: { $in: category.map(id => new mongoose.Types.ObjectId(id)) }
            });
        }

        // If tags are provided, add tag match condition
        if (tags && tags.length > 0) {
            matchConditions.push({
                tags: { $in: tags.map(id => new mongoose.Types.ObjectId(id)) }
            });
        }

        // Final condition: if no search item, category, or tags are provided, return all products
        if (matchConditions.length === 0) {
            matchConditions.push({}); // If no filters are applied, return all products
        }

        // Combine all match conditions
        const pipeline = [
            // Lookup for categories in product pipeline
            {
                $lookup: {
                    from: "categories", // Join the Category collection
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            // Lookup for subcategories in product pipeline
            {
                $lookup: {
                    from: "subcategories", // Join the SubCategory collection
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategoryData"
                }
            },
            // Lookup for shops related to the products
            {
                $lookup: {
                    from: "shops", // Join the Shop collection
                    localField: "shop",
                    foreignField: "_id",
                    as: "shopData"
                }
            },
            // Match to search in name, description, categories, and subcategories
            {
                $match: {
                    $and: matchConditions
                }
            },
            // Project the necessary fields
            {
                $project: {
                    name: 1,
                    description: 1,
                    categoryData: 1,
                    subCategoryData: 1,
                    shopData: 1,
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


