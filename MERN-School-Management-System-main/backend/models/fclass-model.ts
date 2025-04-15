const mongoose = require("mongoose");

const FclassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sections: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Fclass", FclassSchema);
