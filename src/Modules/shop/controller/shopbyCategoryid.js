const Shop = require("../model/shopSchema");
const mongoose = require("mongoose");

const shopbyCategoryid = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;
    const catId = req.body.Categoryid;

    // Ensure catId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(catId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Category ID" });
    }

    const categoryId = new mongoose.Types.ObjectId(catId);

    // Aggregation pipeline to get shops and follower count
    const shopsWithFollowers = await Shop.aggregate([
      // Match shops by category ID
      { $match: { categories: categoryId } },

      // Pagination: Skip and limit
      { $skip: skip },
      { $limit: limit },

      // Lookup to join the followers collection by shopId
      {
        $lookup: {
          from: "followers", // Use actual collection name of Follower
          localField: "_id", // Match by shopId in the Shop collection
          foreignField: "shopId", // Match with the shopId in the Follower collection
          as: "followers", // Name of the joined field
        },
      },
      {
        $lookup: {
          from: "likes", // Use actual collection name of Follower
          localField: "_id", // Match by shopId in the Shop collection
          foreignField: "shopId", // Match with the shopId in the Follower collection
          as: "likes", // Name of the joined field
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
          likeCount: { $size: "$likes" }, // The count of followers
          // The count of followers
          isFollowedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$followers.userId"],
          },
          isLikedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$likes.userId"],
          },
        },
      },
    ]);
    console.log("---------", req.userId);
    // Count total number of shops with the given category (for pagination)
    const totalShops = await Shop.countDocuments({ categories: categoryId });

    const pagination = {
      maxCount: Math.ceil(totalShops / limit),
      page: page,
      limit: limit,
    };

    return res
      .status(200)
      .json({ status: true, result: shopsWithFollowers, pagination });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/shopbycategoryid",
    });
  }
};

module.exports = shopbyCategoryid;
