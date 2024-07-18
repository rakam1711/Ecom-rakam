const userroutes = require("express").Router();

const loginUser = require("")

userroutes.post("/login",loginUser)

module.exports = userroutes;