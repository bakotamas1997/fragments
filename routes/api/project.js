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

router.put("/:project_id/:user_id", auth, (req, res) => {
  User.findById(req.user.id)
    .populate("projects")
    .then((user) => {
      const isUserInProject =
        user.projects.filter((project) => {
          return project._id.toString() === req.params.project_id;
        }).length > 0;

      if (isUserInProject) {
        User.findById(req.params.user_id).then((user) => {
          Project.findById(req.params.project_id).then((project) => {
            user.projects.unshift(project);
            user.save().then(res.json(project));
          });
        });
      } else {
        return res.status(401).json({ error: "Not authorized." });
      }
    });
});

module.exports = router;
