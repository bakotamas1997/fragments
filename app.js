require("./config/db").connect();
const { urlencoded } = require("express");
const express = require("express");

const users = require("./routes/api/user");
const projects = require("./routes/api/project");
const stories = require("./routes/api/story");
const subtasks = require("./routes/api/subtask");
const tags = require("./routes/api/tag");

const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/stories", stories);
app.use("/api/subtasks", subtasks);
app.use("/api/tags", tags);

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
