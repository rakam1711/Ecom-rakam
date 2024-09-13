const Product = require("../../product/model/productSchema");

const searchdynamic = async (req, res) => {
    try {
        const itma = req.body.searchItem;
        const pipeline = await getPipeline(item);
        const result = await Product.aggregate(pipeline);
        return res.status(200).json({ status: true, result })
    } catch (e) {
        return res.status(400).json({ status: false, message: e.message, location: "src/Modules/search/controller/searchdynamic" })
    }
}

module.exports = searchdynamic

const getPipeline = async (item) => {
    try {
        const pipeline = [
            {
                $match: { name: { $like: item } }
            }
        ]

        return pipeline;
    } catch (e) {
        return e
    }
}