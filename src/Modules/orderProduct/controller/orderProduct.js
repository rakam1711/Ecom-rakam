const Cart = require("../../cart/model/cartSchema");
const Order = require("../model/productOrderSchema");

const addProduct = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart || cart.items.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No Product in cart" });
    }

    const ordersArray = cart.items.map((item) => ({
      user: cart.userId,
      item: item,
      totalAmount: item.discountedPrice * item.unit,
      Address: req.body.addressId,
      paymentStatus: "pending",
    }));

    await Order.insertMany(ordersArray);
    await Cart.deleteOne({ _id: cart._id });

    return res
      .status(200)
      .json({ status: true, message: "Orders successfully placed" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = addProduct;
