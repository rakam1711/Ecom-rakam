const subVarient = require("../model/subVarientSchema.js");

const createOrUpdateSubVarient = async (req, res, next) => {
  try {
    const { name, varientId, code } = req.body;

    if (!Array.isArray(name) || name.length === 0) {
      throw new Error("Sub-varient 'name' must be a non-empty array.");
    }
    if (!varientId) {
      throw new Error("Varient ID not provided.");
    }

    const uniqueIncomingNames = [...new Set(name)];

    const existingSubVarient = await subVarient.findOne({ varient: varientId });

    if (existingSubVarient) {
      const updatedNames = [
        ...new Set([...existingSubVarient.name, ...uniqueIncomingNames]),
      ];

      existingSubVarient.name = updatedNames;
      if (code) existingSubVarient.code = code;
      await existingSubVarient.save();

      return res.status(200).send({
        status: true,
        message: "Sub-varient updated successfully",
        data: existingSubVarient,
      });
    } else {
      const newSubVarient = new subVarient({
        name: uniqueIncomingNames,
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
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/Subvarient/controller/createOrUpdateSubVarient",
    });
  }
};

module.exports = createOrUpdateSubVarient;
