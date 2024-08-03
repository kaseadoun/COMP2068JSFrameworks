const mongoose = require("mongoose");

const dataSchemaObject = {
    expense: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
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

module.exports = mongoose.model("Expense", mongooseSchema);