const Cart = require("../model/cartSchema.js");

const updateCartUnit = async (req, res, next) => {
  try {
    let { productId, action } = req.body; // action: "increase" or "decrease"

    if (!productId || !["increase", "decrease"].includes(action)) {
      return res.status(400).json({
        status: false,
        message: "Invalid request data",
      });
    }

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Item not found in cart",
      });
    }

    let item = cart.items[itemIndex];

    if (action === "increase") {
      item.unit += 1;
    } else if (action === "decrease") {
      if (item.unit > 1) {
        item.unit -= 1;
      } else {
        cart.items.splice(itemIndex, 1); // Remove item if unit becomes 0
      }
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.discountedPrice * item.unit,
      0
    );

    await cart.save();

    return res.status(200).json({
      status: true,
      message: `Successfully ${action}d item quantity`,
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "module/cart/controller/updateCart",
    });
  }
};

module.exports = updateCartUnit;
