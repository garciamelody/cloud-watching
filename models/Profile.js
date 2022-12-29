const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);