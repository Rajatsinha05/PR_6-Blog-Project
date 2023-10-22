"use strict";

var express = require("express");

var isAuth = require("../middlewares/auth");

var validator = require("../middlewares/validator");

var user = require("../models/user.schema");

var blog = require("../models/blog.schema");

var Blog = express.Router();
Blog.get("/create", isAuth, function (req, res) {
  res.render("post");
});
Blog.post("/create", isAuth, validator.validatorData, function _callee(req, res) {
  var author, _req$body, title, content, image, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(user.findById(req.cookies.id));

        case 2:
          author = _context.sent;
          _req$body = req.body, title = _req$body.title, content = _req$body.content, image = _req$body.image;
          _context.next = 6;
          return regeneratorRuntime.awrap(blog.create({
            title: title,
            content: content,
            image: image,
            author: author.username
          }));

        case 6:
          data = _context.sent;
          res.send("blog created by ".concat(author.username));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
Blog.get("/blogs", function _callee2(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(blog.find());

        case 2:
          data = _context2.sent;
          res.send(data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
Blog.get('/', function (req, res) {
  res.render("blog");
});
Blog["delete"]("/delete", function _callee3(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(blog.deleteMany({
            title: "Testing Blog"
          }));

        case 2:
          data = _context3.sent;
          res.send(data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = Blog;