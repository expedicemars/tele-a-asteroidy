const mongoose = require("mongoose")

const asteroidSchema = new mongoose.Schema({
    dist: Number,
    angle: Number,
    energy: Number,
    nearest: Number,
    angle_init: Number
}) //disappear in 60s

module.exports = mongoose.model("asteroid", asteroidSchema)