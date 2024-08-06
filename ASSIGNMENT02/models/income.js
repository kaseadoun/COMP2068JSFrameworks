const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchemaObject = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    source: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    description: {
        type: String,
        required: false
    }
}

const mongooseSchema = mongoose.Schema(dataSchemaObject);

module.exports = mongoose.model("Income", mongooseSchema);