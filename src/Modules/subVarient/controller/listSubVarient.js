const subVarient = require("../model/subVarientSchema.js");

const listSubVarient = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = await subVarient.find({ varient: id });
    return res.status(200).send({
      status: true,
      message: "successfully listed",
      data: data,
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
