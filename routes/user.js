const User = require("../model/user");
const api = require("express").Router();

api.get("/login", (req, res) => {
  res.json({ login: "this is the login" });
});

api.get("/register", (req, res) => {
  res.json({ register: "this is the register" });
});

module.exports = api;
