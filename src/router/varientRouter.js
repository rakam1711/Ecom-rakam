const createVarient = require("../Modules/varient/controller/createVarientController");
const deleteVarient = require("../Modules/varient/controller/deleteVarientController");
const listVarient = require("../Modules/varient/controller/listVarientController");
const updateVarient = require("../Modules/varient/controller/updateVarientController");

const varientRoutes = require("express").Router();

varientRoutes.post("/createvarient", createVarient);
varientRoutes.post("/updatevarient", updateVarient);
varientRoutes.post("/deletevarient", deleteVarient);
varientRoutes.post("/listvarient", listVarient);

module.exports = varientRoutes;
