const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const categoryRoutes = require("./routes/category");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server running")
})

app.use("/category",categoryRoutes);

 

async function connectDB(){
     await mongoose.connect("mongodb+srv://mayankmishrareal:TDqE5t1ntAQvn6CR@cluster0.od6s5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        dbName:"ecom-store-db"
     })
     console.log("DB CONNECTED")
}

connectDB().catch((err)=>{
    console.log(err);
})



app.listen(port,(err)=>{
   console.log("Server is running on port", port);
})