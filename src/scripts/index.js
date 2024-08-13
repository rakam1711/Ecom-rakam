const Admin = require("../Modules/admin/model/adminSchema");
const bcryptjs = require("bcryptjs");

async function scripts() {
  await createFirstAdmin();
}

module.exports = scripts;

async function createFirstAdmin() {
  try {
    const result = await Admin.findOne();
    if (result) return;
    const salt = bcryptjs.genSaltSync(2);
    const hashedPassword = await bcryptjs.hash("1212", salt);

    const admin = new Admin({
      number: "9876543210",
      email: "admin@gmail.com",
      name: "Admin",
      password: hashedPassword,
    });
    await admin.save();
    console.log("New admin is created");
  } catch (err) {
    console.log(err.message);
  }
}
