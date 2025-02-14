const Product = require("../../product/model/productSchema");
const mongoose = require("mongoose");

const searchdynamic = async (req, res) => {
  try {
    const item = req.body.searchItem;
    const tags = req.body.tags;
    const category = req.body.categories;
    const service = req.body.service;
    const shop = req.body.shopId;
    const priceRange = req.body.priceRange; // 200-2000 or 3000 - 5000
    const priceLowtoHigh = req.body.priceLowtoHigh; // "HighToLow" or "LowToHigh"

    const pipeline = await getPipeline(
      item,
      category,
      tags,
      service,
      shop,
      priceRange,
      priceLowtoHigh
    );

    const products = await Product.aggregate(pipeline);

    const categories = products.flatMap((p) => p.categoryData);
    const shops = products.flatMap((p) => p.shopData);

    const uniqueCategories = categories.filter(
      (category, index, self) =>
        index ===
        self.findIndex((c) => c._id.toString() === category._id.toString())
    );

    const uniqueShops = shops.filter(
      (shop, index, self) =>
        index ===
        self.findIndex((s) => s._id.toString() === shop._id.toString())
    );

    return res.status(200).json({
      status: true,
      products,
      categories: uniqueCategories,
      shops: uniqueShops,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "src/Modules/search/controller/searchdynamic",
    });
  }
};

module.exports = searchdynamic;

const getPipeline = async (
  item,
  category,
  tags,
  service,
  shop,
  priceRange,
  priceLowtoHigh
) => {
  try {
    let matchConditions = [{ isActive: true }];

    if (item) {
      matchConditions.push({
        $or: [
          { name: { $regex: item, $options: "i" } },
          { description: { $regex: item, $options: "i" } },
          { "categoryData.name": { $regex: item, $options: "i" } },
          { "subCategoryData.name": { $regex: item, $options: "i" } },
          { "shopData.name": { $regex: item, $options: "i" } },
        ],
      });
    }

    if (category && category.length > 0) {
      matchConditions.push({
        category: {
          $in: category.map((id) => new mongoose.Types.ObjectId(id)),
        },
      });
    }

    if (shop) {
      matchConditions.push({ shop: new mongoose.Types.ObjectId(shop) });
    }

    if (tags && tags.length > 0) {
      matchConditions.push({
        tag: { $in: tags.map((id) => new mongoose.Types.ObjectId(id)) },
      });
    }

    if (priceRange && priceRange.length === 2) {
      const [minPrice, maxPrice] = priceRange;
      matchConditions.push({
        price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
      });
    }

    if (service) {
      matchConditions.push({
        service: new mongoose.Types.ObjectId(service),
      });
    }

    const pipeline = [
      { $match: { $and: matchConditions } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryData",
        },
      },
      {
        $lookup: {
          from: "shops",
          localField: "shop",
          foreignField: "_id",
          as: "shopData",
        },
      },
      {
        $lookup: {
          from: "service",
          localField: "service",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          createdAt: 0,
        },
      },
    ];

    if (priceLowtoHigh) {
      const sortOrder = priceLowtoHigh === "LowToHigh" ? 1 : -1;
      pipeline.push({ $sort: { price: sortOrder } });
    }

    return pipeline;
  } catch (e) {
    throw e;
  }
};
