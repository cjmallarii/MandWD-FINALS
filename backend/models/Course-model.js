const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    imgLink: String,
    name: String,
    description: String,
    price: Number,
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Course", courseSchema);