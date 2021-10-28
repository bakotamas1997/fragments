const router = require("express").Router();
const auth = require("../../middleware/auth");
const Project = require("../../model/project");
const User = require("../../model/user");

router.post("/", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!req.body.name && !req.body.description) {
      return res
        .status(400)
        .json({ error: "Name and description are required." });
    }

    const project = new Project({
      name: req.body.name,
      description: req.body.description,
    });

    project.save().then((project) => {
      user.projects.unshift(project);
      user.save().then((user) => res.json({ projects: user.projects }));
    });
  });
});

router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .populate("projects")
    .then((user) => {
      return res.json({ projects: user.projects });
    });
});

module.exports = router;
