const express = require("express");
const isAuth = require("../middlewares/auth");
const validator = require("../middlewares/validator");

const user = require("../models/user.schema");
const blog = require("../models/blog.schema");
const Blog = express.Router();
Blog.get("/create", isAuth, (req, res) => {
  res.render("post");
});

Blog.post("/create", isAuth, validator.validatorData, async (req, res) => {
  let author = await user.findById(req.cookies.id);
console.log(req.body);
  let { title, content, image ,category} = req.body;
  let data = await blog.create({
    title,
    content,
    image,
    category,
    author: author.username,
  });
  res.cookie("blogId", data.id).send(`blog created by ${author.username} `);
});

Blog.get("/blogs", async (req, res) => {
  let data = await blog.find();
  res.send(data);
});
Blog.get("/", (req, res) => {
  res.render("blog");
});
Blog.delete("/delete", async (req, res) => {
  let data = await blog.deleteMany({ title: "Testing Blog" });
  res.send(data);
});
Blog.delete("/delete/:id", isAuth, async (req, res) => {
  let { id } = req.params;

  let data = await blog.findByIdAndDelete(id);
  try {
    if (data) res.redirect("/blog");
    else {
      res.send("no blog found");
    }
  } catch (error) {
    res.send("testing");
  }
});
Blog.patch("/edit/:id", isAuth, async (req, res) => {
  let { id } = req.params;

  let data = await blog.findByIdAndUpdate(id, req.body);
  try {
    if (data) res.send("updated");
    else {
      res.send("no blog found");
    }
  } catch (error) {
    res.send("testing");
  }
});

Blog.get("/singleBlog/:id", async (req, res) => {
  let { id } = req.params;
  let singleBlog = await blog.findById(id);
  console.log(singleBlog);
  res.render("singleblog", { singleBlog });
});
module.exports = Blog;
