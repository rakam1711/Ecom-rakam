const upload = require("../../../Middleware/multer/multipleImageUpload");
const addNewProduct = async (req, res) => {
    upload(req, res, async()=>{
        try {
            const body = req.body;
        } catch (err) {
            return res.status(400).json({ status: false, error: err.message })
        }
    })
    
}

module.exports = addNewProduct;