const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: String,
  likedBy: [{ username: String }],
  comments: [
    {
      text: String,
      username: String,
      date: { type: Date, default: Date.now },
    },
  ],
});
const blog=mongoose.model("blog",MovieSchema)
module.exports=blog;