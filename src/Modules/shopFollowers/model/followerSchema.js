const mongoose = require("mongoose");
const schema = new mongoose.Schema({});

const followerSchema = mongoose.model("Follower", schema);

module.exports = followerSchema;
