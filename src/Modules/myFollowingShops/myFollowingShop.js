const Shop = require("../shop/model/shopSchema.js");
const mongoose = require("mongoose");

const myFollowingShop = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;
    console.log(req.userId, "myfolloing");
    const matchCondition = {
      isActive: true,
    };

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
          isFollowedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$followers.userId"],
          },
          isLikedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$likes.userId"],
          },
        },
      },

      {
        $match: {
          isFollowedByUser: true,
        },
      },
    ];

    const shopsWithFollowers = await Shop.aggregate(pipeline);
    const totalShops = await Shop.countDocuments();

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
      location: "sec/Modules/myFollowingShop/myFollowingShop.js",
    });
  }
};

module.exports = myFollowingShop;
