const mongoose = require('mongoose');

const dataSchemaObject = {
    income: {
        type: Array
    },
    expense: {
        type: Array
    }
}

const mongooseSchema = mongoose.Schema(dataSchemaObject);
module.exports = mongoose.model("Sample", mongooseSchema);