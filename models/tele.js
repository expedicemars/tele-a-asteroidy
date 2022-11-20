const mongoose = require("mongoose")

const teleSchema = new mongoose.Schema({
    num: Number,
    name: String,
    value: String
})

module.exports = mongoose.model("telemetry", teleSchema)