const productByShopId = async (req, res) => {
    try { 
        const shipId = req.body.shipId;
        const item = req.body.searchItem;
        const tags = req.body.tags;
        const category = req.body.categories;
        const service = req.body.service;  // Service from the request body
        const priceRange = req.body.priceRange;
        const priceLowtoHigh = req.body.priceLowtoHigh;
        
    } catch (e) {
        return res.status(400).json({ status: false, message: e.message, location: "src/Modules/product/controller/productbushopid.js" })
    }
}

module.exports = productByShopId