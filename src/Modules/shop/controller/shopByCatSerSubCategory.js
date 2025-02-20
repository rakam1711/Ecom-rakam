const Shop = require("../model/shopSchema");
const mongoose = require("mongoose");

const shopbyCatSerSubCategory = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    const { Categoryid, isPopularShop, subCategoryId, serviceId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(Categoryid)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Category ID" });
    }

    const matchCondition = {
      categories: new mongoose.Types.ObjectId(Categoryid),
      isActive: true,
    };

    if (serviceId && mongoose.Types.ObjectId.isValid(serviceId)) {
      matchCondition.service = new mongoose.Types.ObjectId(serviceId);
    }

    if (subCategoryId && mongoose.Types.ObjectId.isValid(subCategoryId)) {
      matchCondition.subCategories = {
        $in: [new mongoose.Types.ObjectId(subCategoryId)],
      };
    }

    if (isPopularShop) {
      matchCondition.isPopular = true;
    }

    let userId = null;
    if (req.userId && mongoose.Types.ObjectId.isValid(req.userId)) {
      userId = new mongoose.Types.ObjectId(req.userId);
    }

    const pipeline = [
      { $match: matchCondition },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "shopId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "shopId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "vendor",
          localField: "owner",
          foreignField: "_id",
          as: "vendors",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          isActive: 1,
          owner: 1,
          street: 1,
          city: 1,
          state: 1,
          postalCode: 1,
          country: 1,
          phone: 1,
          email: 1,
          website: 1,
          logo: 1,
          rating: 1,
          numberOfRatings: 1,
          shopId: 1,
          createdAt: 1,
          updatedAt: 1,
          followerCount: { $size: "$followers" },
          likeCount: { $size: "$likes" },
          ownerName: { $arrayElemAt: ["$vendors.ownerName", 0] },
          isFollowedByUser: {
            $cond: {
              if: { $gt: [{ $size: "$followers" }, 0] },
              then: { $in: [userId, "$followers.userId"] },
              else: false,
            },
          },
          isLikedByUser: {
            $cond: {
              if: { $gt: [{ $size: "$likes" }, 0] },
              then: { $in: [userId, "$likes.userId"] },
              else: false,
            },
          },
        },
      },
    ];

    const shopsWithFollowers = await Shop.aggregate(pipeline);

    const totalMatchCondition = {
      categories: new mongoose.Types.ObjectId(Categoryid),
    };

    if (subCategoryId && mongoose.Types.ObjectId.isValid(subCategoryId)) {
      totalMatchCondition.subCategories = {
        $in: [new mongoose.Types.ObjectId(subCategoryId)],
      };
    }

    const totalShops = await Shop.countDocuments(totalMatchCondition);

    const pagination = {
      maxCount: Math.ceil(totalShops / limit),
      page,
      limit,
    };

    return res
      .status(200)
      .json({ status: true, result: shopsWithFollowers, pagination });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "src/Modules/shop/controller/shopbycategoryid",
    });
  }
};

module.exports = shopbyCatSerSubCategory;
