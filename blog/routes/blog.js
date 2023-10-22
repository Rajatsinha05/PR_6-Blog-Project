const express = require("express");
const isAuth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const Fuse = require("fuse.js");
const user = require("../models/user.schema");
const blog = require("../models/blog.schema");
const isLogin = require("../middlewares/login");
const Blog = express.Router();
Blog.get("/create", isAuth, (req, res) => {
  res.render("post");
});

Blog.post("/create", isAuth, validator.validatorData, async (req, res) => {
  let author = await user.findById(req.cookies.id);

  let { title, content, image, category } = req.body;
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
  let { category } = req.query;

  let data;
  if (category) {
    data = await blog.find({ category: category });
  } else {
    data = await blog.find();
  }
  res.send(data);
});
Blog.get("/", (req, res) => {
  res.render("blog");
});
Blog.delete("/delete", async (req, res) => {
  let data = await blog.deleteMany({ title: "checking" });
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

  res.render("singleblog", { singleBlog });
});

Blog.patch("/like/:mid", isLogin, async (req, res) => {
  let { id } = req.cookies;
  let { mid } = req.params;
  let username = await user.findById(id);

  let post = await blog.findById(mid);

  post.likedBy.push({ username: username.username });
  await post.save();

  res.send(post);
});

Blog.patch("/comment/:mid", isLogin, async (req, res) => {
  let { id } = req.cookies;
  let { mid } = req.params;
  let User = await user.findById(id);

  let post = await blog.findById(mid);

  post.comments.push({ username: User.username, text: req.body.text });
  await post.save();

  res.send(post);
});

Blog.get("/search", async (req, res) => {
  let query = req.query.blogs;
  const blogs = await blog.find();

  const options = {
    keys: ["author", "category", "title"],
  };

  const fuse = new Fuse(blogs, options);
  const result = fuse.search(query);
  res.send(result);
});
module.exports = Blog;
