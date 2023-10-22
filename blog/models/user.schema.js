const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
