const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
module.exports = mongoose.model("accounts", accountSchema);
