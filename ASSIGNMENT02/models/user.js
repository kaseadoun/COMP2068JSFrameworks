const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const dataSchemaObject = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    oauthId: { type: String },
    oauthPRovider: { type: String },
    created: { type: Date },
};
const mongooseSchema = mongoose.Schema(dataSchemaObject);

mongooseSchema.plugin(plm);
module.exports = mongoose.model("User", mongooseSchema);