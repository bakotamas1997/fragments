const mongoose = require("mongoose");

const Story = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  subtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subtask",
    },
  ],
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "status",
  },
});

module.exports = mongoose.model("story", Story);
