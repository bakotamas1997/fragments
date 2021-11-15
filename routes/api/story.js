const router = require("express").Router();

const auth = require("../../middleware/auth");

const User = require("../../model/user");
const Story = require("../../model/story");
const Project = require("../../model/project");
const Status = require("../../model/status");

const { isProjectValid, isStoryValid } = require("../helper");

//POST api/stories/:project_id
//Create a post
//Private
router.post("/:project_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    if (!req.body.name || !req.body.description) {
      return res
        .status(400)
        .json({ error: "All of the input fields are required" });
    }

    Project.findById(req.params.project_id).then((project) => {
      Status.findOne({ name: "Ready" }).then((status) => {
        const story = new Story({
          name: req.body.name,
          description: req.body.description,
          owner: user,
          subtasks: [],
          status: status,
        });

        story.save().then((story) => {
          project.stories.unshift(story);
          project.save().then((project) => res.json(project.stories));
        });
      });
    });
  });
});

router.get("/:project_id/:story_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    Project.findById(req.params.project_id).then((project) => {
      if (!isStoryValid(project, req)) {
        return res.status(404).json({ error: "Could not find story." });
      }

      Story.findById(selectedStory[0]._id.toString())
        .populate("owner", ["firstName", "lastName", "email"])
        .then((story) => res.json(story));
    });
  });
});

router.get("/:project_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    Project.findById(req.params.project_id)
      .populate("stories")
      .then((project) => {
        const storyIds = project.stories.map((story) => story._id);
        Story.find({ _id: { $in: storyIds } })
          .populate("status", "name")
          .then((stories) => {
            res.json(stories);
          });
      });
  });
});

router.put("/:project_id/:story_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    if (!req.body.name && !req.body.description) {
      return res.status(400).json({ error: "Please give a valid input." });
    }

    Project.findById(req.params.project_id).then((project) => {
      if (!isStoryValid(project, req)) {
        return res.status(404).json({ error: "Could not find story." });
      }

      Story.findById(req.params.story_id)
        .populate("owner", ["firstName", "lastName", "email"])
        .then((story) => {
          story.name = req.body.name || story.name;
          story.description = req.body.description || story.description;
          story.save().then((story) => res.json(story));
        });
    });
  });
});

module.exports = router;
