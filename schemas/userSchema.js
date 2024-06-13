const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    city: String,
});

module.exports = mongoose.model("users", userSchema);
