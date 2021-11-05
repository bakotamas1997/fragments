const router = require("express").Router();
const Status = require("../../model/status");

const auth = require("../../middleware/auth");

router.post("/", auth, (req, res) => {
  Status.findOne({ name: req.body.name }).then((status) => {
    if (status) {
      return res.status(400).json({ error: "Status already exists!" });
    }

    const newStatus = new Status({
      name: req.body.name,
    });

    newStatus.save().then((status) => {
      res.json(status);
    });
  });
});

router.get("/", auth, (req, res) => {
  Status.find().then((statuses) => res.json(statuses));
});

router.get("/:status_id", auth, (req, res) => {
  Status.findById(req.params.status_id).then((status) => {
    res.json(status);
  });
});

module.exports = router;
