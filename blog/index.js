const express = require("express");
const connection = require("./config/db");
const cookies=require("cookie-parser");
const Router = require("./routes/user.route");
const Blog = require("./routes/blog");
const app = express();
app.use(cookies())
app.set("view engine","ejs")
app.set("views",__dirname+"/view")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/user",Router)
app.use('/blog',Blog)
app.get("/",(req,res)=>{
  res.send("Welcome to the movie API")
})

app.listen(8090,()=>{
  console.log("server is running on port 8090");
  connection()
});
