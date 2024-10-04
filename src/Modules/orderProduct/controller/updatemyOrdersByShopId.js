const orders = require("../model/productOrderSchema");
const mongoose = require("mongoose");

const updatemyOrdersByShopId = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const productId = new mongoose.Types.ObjectId(req.body.productId);
        const status = req.body.productStatus || "confirm";
        const reason = req.body.reason || "";

        const updatedOrder = await orders.findOneAndUpdate(
            {
                _id: orderId,
                "items.productId": productId // Match specific productId in the items array
            },
            {
                $set: {
                    "items.$.ProductStatus": status, // Update ProductStatus for the matching item
                    "items.$.reason": reason // Update ProductStatus for the matching item
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ status: false, message: "Order or Product not found" });
        }

        return res.status(200).json({ status: true, message: "Product status updated successfully", updatedData: updatedOrder });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

module.exports = updatemyOrdersByShopId;
