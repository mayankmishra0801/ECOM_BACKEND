const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:String,
    shortDescription:String,
    description:String,
    purchagePrice:Number,
    sellingPrice:Number,
    images:Array(string),
    categoryId: {type:Schema.Types.ObjectId,ref:'categories'}



});

const Product = mongoose.model("products",productSchema);
module.exports = Product;
