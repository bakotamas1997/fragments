const mongoose = require("mongoose");

const Subtask = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
});

module.exports = mongoose.model("subtask", Subtask);
