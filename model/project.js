const mongoose = require("mongoose");

const Project = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "story",
    },
  ],
});

module.exports = mongoose.model("project", Project);
