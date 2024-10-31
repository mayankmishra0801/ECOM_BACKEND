const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishListSchema = new mongoose.Schema({
   
    userId: {type:Schema.Types.ObjectId,ref:'users'},
    productId:Array(string)



});

const Wishlist = mongoose.model("categories",wishListSchema);
module.exports = Wishlist;
