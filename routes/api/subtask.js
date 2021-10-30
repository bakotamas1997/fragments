const router = require("express").Router();

const User = require("../../model/user");
const Project = require("../../model/project");
const Story = require("../../model/story");
const Subtask = require("../../model/subtask");
const Tag = require("../../model/tag");

const auth = require("../../middleware/auth");
const { isProjectValid, isStoryValid, isSubtaskValid } = require("../helper");

router.post("/:project_id/:story_id/", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    Project.findById(req.params.project_id)
      .populate("stories")
      .then((project) => {
        if (!isStoryValid(project, req)) {
          return res.status(404).json({ error: "Could not find story. " });
        }

        Story.findById(req.params.story_id)
          .populate("subtasks")
          .then((story) => {
            if (!req.body.name || !req.body.description) {
              return res
                .status(400)
                .json({ error: "Input fields are all required" });
            }

            const subtask = new Subtask({
              name: req.body.name,
              description: req.body.description,
            });

            subtask.save().then((subtask) => {
              story.subtasks.unshift(subtask);
              story.save().then((story) => res.json(story));
            });
          });
      });
  });
});

router.get("/:project_id/:story_id/:subtask_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req, res)) {
      return res.status(404).json({ error: "Could not find project." });
    }

    Project.findById(req.params.project_id)
      .populate("stories")
      .then((project) => {
        if (!isStoryValid(project, req)) {
          return res.status(404).json({ error: "Could not find story. " });
        }

        Story.findById(req.params.story_id)
          .populate("subtasks")
          .then((story) => {
            const selectedSubtask = story.subtasks.filter(
              (subtask) => subtask._id.toString() === req.params.subtask_id
            )[0];
            if (!selectedSubtask) {
              return res.status(404).json({ error: "Could not find subtask." });
            }
            res.json(selectedSubtask);
          });
      });
  });
});

router.get("/:project_id/:story_id/", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }
    Project.findById(req.params.project_id).then((project) => {
      if (!isStoryValid(project, req)) {
        return res.status(404).json({ error: "Could not find project." });
      }
      Story.findById(req.params.story_id)
        .populate("subtasks")
        .then((story) => {
          res.json(story.subtasks);
        });
    });
  });
});

router.put("/:project_id/:story_id/:subtask_id/:tag_id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!isProjectValid(user, req)) {
      return res.status(404).json({ error: "Could not find project." });
    }
    Project.findById(req.params.project_id).then((project) => {
      if (!isStoryValid(project, req)) {
        return res.status(404).json({ error: "Could not find story." });
      }
      Story.findById(req.params.story_id).then((story) => {
        if (!isSubtaskValid(story, req)) {
          return res.status(404).json({ error: "Could not find subtask." });
        }

        Subtask.findById(req.params.subtask_id).then((subtask) => {
          Tag.findById(req.params.tag_id)
            .then((tag) => {
              subtask.tags.unshift(tag);
              subtask.save().then((subtask) => res.json(subtask));
            })
            .catch((err) => {
              return res.status(404).json({ error: "Could not find tag." });
            });
        });
      });
    });
  });
});

module.exports = router;
