const router = require("express").Router();

const auth = require("../../middleware/auth");

const User = require("../../model/user");
const Story = require("../../model/story");
const Project = require("../../model/project");

//POST api/stories/:project_id
//Create a post
//Private
router.post("/:project_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    const selectedProject = user.projects.filter(
      (project) => project._id.toString() === req.params.project_id
    );

    if (selectedProject[0].length < 1) {
      return res
        .status(401)
        .json({ error: "No permission to add story to the project." });
    }

    if (!req.body.name || !req.body.description) {
      return res
        .status(400)
        .json({ error: "All of the input fields are required" });
    }

    Project.findById(req.params.project_id).then((project) => {
      const story = new Story({
        name: req.body.name,
        description: req.body.description,
        owner: user,
      });

      project.stories.unshift(story);
      project.save().then((project) => res.json(project));
    });
  });
});

module.exports = router;
