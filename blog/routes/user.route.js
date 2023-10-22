const express = require("express");
const user = require("../models/user.schema");

const Router = express.Router();

Router.get("/signup", (req, res) => {
  res.render("signup");
});

Router.post("/signup", async (req, res) => {
  let data = await user.findOne({ email: req.body.email });
  if (!data) {
    data = await user.create(req.body);
  }
  res.cookie("role", data.role); // No changes here, setting "role" cookie
  res.cookie("id", data.id, { maxAge: 50000 }); // Setting "id" cookie with a maxAge of 50000 milliseconds
  res.send(`Account created successfully ${data.username}`);
  
});

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let data = await user.findOne({ email: email, password: password });
  if (data) {
    res.cookie("id", data.id); // Setting "id" cookie
    res.cookie("role", data.role); // Setting "role" cookie
    res.send(`Welcome User ${data.username}`);
  } else {
    res.send("Invalid Credentials.");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  let data = await user.findByIdAndDelete(req.params.id);
  res.send(`User deleted ${data.username}`);
});

module.exports = Router;
