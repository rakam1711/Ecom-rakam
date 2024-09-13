const subVarient = require("../model/subVarientSchema.js");

const listSubVarient = async (req, res, next) => {
  try {
    const varientId = req.body.varientId;
    const vendorId = req.vendorId;
    const sexa = { role: "ADMIN", varient: varientId };
    if (vendorId) {
      sexa.createdBy = vendorId;
    }

    const data = await subVarient.find(sexa);

    return res.status(200).send({
      status: true,
      message: "successfully listed",
      data,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/subvarient/controller/listSubVarient",
    });
  }
};

module.exports = listSubVarient;
