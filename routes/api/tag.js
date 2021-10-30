const router = require("express").Router();
const User = require("../../model/user");
const Project = require("../../model/project");
const Story = require("../../model/story");
const Subtask = require("../../model/subtask");
const Tag = require("../../model/tag");

const auth = require("../../middleware/auth");
const { isProjectValid, isStoryValid } = require("../helper");

router.get("/", auth, (req, res) => {
  Tag.find().then((tags) => res.json(tags));
});

router.post("/", auth, (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ error: "All the fields are required." });
  }

  const newTag = new Tag({
    name: req.body.name,
    description: req.body.description,
  });

  newTag.save().then((tag) => res.json(tag));
});

module.exports = router;
