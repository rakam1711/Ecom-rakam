const subcategorySchema = require("../model/subcategorySchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");

const subcreateCategory = async (req, res, next) => {
  const adminId = req.userId;

  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const mustData = {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }
      const subcategory = await subcategorySchema.findOne({
        name: mustData.name,
      });
      if (!subcategory) {
        const addCategory = new subcategorySchema({
          name: mustData.name,
          description: mustData.description,
          category: mustData.categoryId,
        });
        await addCategory.save();
        return res.status(201).json({
          status: true,
          message: "subcategory created successfully",
        });
      } else {
        throw new Error("subcategory already present");
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/createsubCategory",
      });
    }
  });
};

module.exports = subcreateCategory;
