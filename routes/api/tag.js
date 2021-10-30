const router = require("express").Router();
const Tag = require("../../model/tag");

const auth = require("../../middleware/auth");

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
