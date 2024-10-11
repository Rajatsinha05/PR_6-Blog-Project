const mongoose=require("mongoose")

const connection=async()=>{
    await mongoose.connect("mongodb+srv://rw5rajatas:node@cluster0.mjizt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("mongodb connected");
}
module.exports=connection
