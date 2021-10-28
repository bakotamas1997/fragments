const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
