require("./config/db").connect();
const { urlencoded } = require("express");
const express = require("express");
const users = require("./routes/api/user");
const projects = require("./routes/api/project");

const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));

app.use("/api/users", users);
app.use("/api/projects", projects);

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
