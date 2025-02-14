const Cart = require("../model/cartSchema.js");

const addToCart = async (req, res, next) => {
  try {
    let { items } = req.body;

    if (!Array.isArray(items)) {
      items = [items];
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.discountedPrice * item.unit,
      0
    );

    let cart = await Cart.findOne({ userId: req.userId });

    if (cart) {
      cart.items.push(...items);

      cart.totalAmount += totalAmount;
    } else {
      cart = new Cart({
        userId: req.userId,
        items: items,
        totalAmount: totalAmount,
      });
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
