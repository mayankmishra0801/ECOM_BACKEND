const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
const cors = require('cors');

// const allowedOrigins = ['https://ecom-mayank.vercel.app'];
//  // Add the allowed origins
const categoryRoutes  = require("./routes/category");

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

// app.use(cors(corsOptions));
require("dotenv").config();
// app.use(cors());
app.use(cors({origin:"*"}))

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server is running")
})



app.use("/category",verifyToken,isAdmin,categoryRoutes);


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
    console.log("Server is running on port",port);
})
