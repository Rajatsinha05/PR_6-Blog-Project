const mongoose=require("mongoose")

const connection=async()=>{
    await mongoose.connect("mongodb+srv://daksh1or2:movie@cluster0.qy1gavv.mongodb.net/?retryWrites=true&w=majority")
    console.log("mongodb connected");
}
module.exports=connection