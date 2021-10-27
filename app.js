require("./config/db").connect();
const { urlencoded } = require("express");
const express = require("express");
const users = require("./routes/user");

const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));

app.use("/users", users);

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
