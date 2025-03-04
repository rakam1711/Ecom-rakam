const mongoose = require("mongoose");
const Cart = require("../model/cartSchema.js");

const deleteCartItems = async (req, res, next) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemObjectId = new mongoose.Types.ObjectId(itemId);

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => !item.productId.equals(itemObjectId)
    );

    if (cart.items.length === initialItemCount) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);

    await cart.save();

    res.status(200).json({
      status: true,
      message: "Successfully deleted item from cart",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/modules/cart/controller/deleteCartItems.js",
    });
  }
};

module.exports = deleteCartItems;
