const subVarient = require("../model/subVarientSchema.js");

const createOrUpdateSubVarient = async (req, res, next) => {
  try {
    const { name, varientId, code } = req.body;

    if (!varientId) {
      throw new Error("Varient ID not provided.");
    }

    const newSubVarient = new subVarient({
      name: name,
      varient: varientId,
      createdBy: req.vendorId || req.adminId,
      role: req.role || "default_role",
      code: code || undefined,
    });

    await newSubVarient.save();

    return res.status(200).send({
      status: true,
      message: "Sub-varient created successfully",
      data: newSubVarient,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/Subvarient/controller/createOrUpdateSubVarient",
    });
  }
};

module.exports = createOrUpdateSubVarient;
