const mongoose = require("mongoose");

const dataSchemaObject = {
    name: {
        type: String,
        required: true,
    },
    type:{
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
    },

}

const mongooseSchema = mongoose.Schema(dataSchemaObject);

module.exports = mongoose.model("Expense", mongooseSchema);