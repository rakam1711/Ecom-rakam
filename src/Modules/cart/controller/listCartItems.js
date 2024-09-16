const Cart = require("../model/cartSchema.js");

const listCartItems = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId: userId })
      .populate("productId", "name price")
      .populate("items.varient", "name")
      .populate("items.subVarient", "name");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      status: true,
      message: "successfully cart listed",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/modules/cart/controller/listCartItem.js",
    });
  }
};

module.exports = listCartItems;
