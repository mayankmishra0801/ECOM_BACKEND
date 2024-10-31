const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors")
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const  authRoutes = require("./routes/auth");
const {verifyToken,isAdmin} = require("./middleware/auth-middleware");

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server running")
})

app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/products",verifyToken,isAdmin,productRoutes);
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth",authRoutes);

// app.use("/category",categoryRoutes);
// app.use("/brand",brandRoutes);
// app.use("/products",productRoutes);
// app.use("/customer",customerRoutes);
// app.use("/auth",authRoutes);
 

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