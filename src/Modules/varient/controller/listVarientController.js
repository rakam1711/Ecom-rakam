const Varient = require("../model/varientSchema.js");

const listVarient = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = Varient.findById(id);
    return res.status(200).send({
      status: true,
      message: "successfully listed",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/varient/controller/listVarientController",
    });
  }
};

module.exports = listVarient;
