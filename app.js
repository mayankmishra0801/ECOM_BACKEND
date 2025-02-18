const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors")
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order")
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const  authRoutes = require("./routes/auth");
const {verifyToken,isAdmin} = require("./middleware/auth-middleware");
require('dotenv').config();


// const allowedOrigins = ['https://ecom-mayank.vercel.app']; // Add the allowed origins
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

app.use(cors({origin:"*"}))
// app.use(cors(corsOptions));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server running")
})

app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/products",verifyToken,isAdmin,productRoutes);
app.use("/orders",verifyToken,isAdmin,orderRoutes)
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth",authRoutes);

// app.use("/category",categoryRoutes);
// app.use("/brand",brandRoutes);
// app.use("/products",productRoutes);
// app.use("/customer",customerRoutes);
// app.use("/auth",authRoutes);
 

async function connectDB(){
     await mongoose.connect(process.env.MONGODB_URI,{
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