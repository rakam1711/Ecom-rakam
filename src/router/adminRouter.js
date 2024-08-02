const adminroutes = require("express").Router();

const loginAdmin = require("../Modules/admin/controller/loginAdmin");

adminroutes.post("/admin-login", loginAdmin);

module.exports = adminroutes;
