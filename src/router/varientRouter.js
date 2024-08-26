const createSubVarient = require("../Modules/subVarient/controller/createSubVarient");
const deleteSubVarient = require("../Modules/subVarient/controller/deleteSubVarient");
const listSubVarient = require("../Modules/subVarient/controller/listSubVarient");
const updateSubVarient = require("../Modules/subVarient/controller/updateSubVarient");
const createVarient = require("../Modules/varient/controller/createVarientController");
const deleteVarient = require("../Modules/varient/controller/deleteVarientController");
const listVarient = require("../Modules/varient/controller/listVarientController");
const updateVarient = require("../Modules/varient/controller/updateVarientController");

const varientRoutes = require("express").Router();

varientRoutes.post("/createvarient", createVarient);
varientRoutes.post("/updatevarient", updateVarient);
varientRoutes.post("/deletevarient", deleteVarient);
varientRoutes.post("/listvarient", listVarient);

varientRoutes.post("/createsubvarient", createSubVarient);
varientRoutes.post("/updatesubvarient", updateSubVarient);
varientRoutes.post("/deletesubvarient", deleteSubVarient);
varientRoutes.post("/listsubvarient", listSubVarient);

module.exports = varientRoutes;
