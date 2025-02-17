const Cart = require("../model/cartSchema.js");

const addToCart = async (req, res, next) => {
  try {
    let { items } = req.body;

    if (!Array.isArray(items)) {
      items = [items];
    }

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      const totalAmount = items.reduce(
        (sum, item) => sum + item.discountedPrice * item.unit,
        0
      );

      cart = new Cart({
        userId: req.userId,
        items,
        totalAmount,
      });
    } else {
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === newItem.productId.toString()
        );

        if (existingItem) {
          existingItem.unit += newItem.unit;
        } else {
          cart.items.push(newItem);
        }
      });
      cart.totalAmount = cart.items.reduce(
        (sum, item) => sum + item.discountedPrice * item.unit,
        0
      );
    }

    await cart.save();
    return res
      .status(200)
      .json({ status: true, message: "Successfully added to cart", cart });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "module/cart/controller/addToCart",
    });
  }
};

module.exports = addToCart;
