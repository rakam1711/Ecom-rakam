const cart = require("../../cart/model/cartSchema");
const orders = require("../model/productOrderSchema");

const addProduct = async (req, res) => {
    try {
        const cart = await cart.findOne({ userId: req.userId })

        const result = new orders.schema({
            products: "",
            shops: "",
            paymetStatus: "paid/unpaid"
        })

        await result.save();
        return res.status(200).json({ status: true, message: "nothing" })


    } catch (err) {
        return res.status(400).json({ status: false, message: err.message })
    }
}

module.exports = addProduct;