const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
   date:Date,
   items:Array(any),
   status:Number,

});

const Order = mongoose.model("categories",orderSchema);
module.exports = Order;
