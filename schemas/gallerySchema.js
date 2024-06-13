const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
    image_url: String,
});

module.exports = mongoose.model("gallery", gallerySchema);
