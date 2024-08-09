const categorySchema = require("../model/categorySchema");
const upload = require("../../../Middleware/multer/singleImageUpload.js");

const createCategory = async (req, res, next) => {
  upload.single("photo")(req, res, async (err) => {
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
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }

      const category = await categorySchema.findOne({ name: mustData.name });
      if (!category) {
        const addCategory = new categorySchema({
          name: mustData.name,
          description: mustData.description,
          createdBy: req.adminId,
        });
        await addCategory.save();
        return res.status(201).json({
          status: true,
          message: "caegeory created successfully",
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "category already present",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/createCategory",
      });
    }
  });
};

module.exports = createCategory;
