const Vendor = require("../model/vendorSchema.js");

const listVendor = async (req, res, next) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let page = parseInt(req.body.page) || 1;

    const input = req.body.input || "";

    let pipeline = [];

    if (input.trim() !== "") {
      pipeline.push({
        $match: {
          $or: [
            { ownerName: { $regex: input, $options: "i" } },
            { shopName: { $regex: input, $options: "i" } },
            { number: { $regex: input, $options: "i" } },
            { email: { $regex: input, $options: "i" } },
          ],
        },
      });
    }

    let skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const admins = await Vendor.aggregate(pipeline);

    if (admins.length === 0) {
      return res.status(404).json({ message: "No vendor found" });
    }

    return res.status(200).json({
      status: true,
      message: "Vendor listed successfully",
      data: admins,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/listVendor",
    });
  }
};

module.exports = listVendor;
