const cart = require("../model/cartSchema.js");

const addToCart = async (req, res, next) => {
  try {
    const cart = new cart({
      userId: req.userId,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "module/cart/controller/addToCart",
    });
  }
};

module.exports = addToCart;
