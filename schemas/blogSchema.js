const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    author_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts", // Update to the actual name of your 'accounts' model
    },
    title: String,
    content: String,
});

module.exports = mongoose.model("Blog", blogSchema); // Updated the model name to "Blog"
