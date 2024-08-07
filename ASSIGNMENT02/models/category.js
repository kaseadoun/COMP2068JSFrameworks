const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchemaObject = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}

const mongooseSchema = mongoose.Schema(dataSchemaObject);
module.exports = mongoose.model("Category", mongooseSchema);