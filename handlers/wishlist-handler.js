const Wishlist = require("../db/wishlist");
const Product = require("../db/product");

async function  addToWishlist(userId,productId){    


  const wishlist = await Wishlist({
    userId:userId,
    productId:productId
});

await wishlist.save();
return wishlist.toObject();


}

async function removeFromWishlist(userId,productId){
  
  await Wishlist.deleteMany({
    userId:userId,
    productId:productId
  })

}

async function getWishList(userId){
  
    let wishlist = await Wishlist.find({ userId:userId
    }).populate('productId');
    // 

    console.log("Wishlist after populate:", wishlist);
    return wishlist.map((x)=>x.toObject());


}



// async function getWishList(userId) {
//     let wishlist = await Wishlist.find({ userId: userId }).populate('productId');
//     console.log("Wishlist after populate:", wishlist); // This should show the populated product data
    
//     // Check if productId is populated or null
//     wishlist.forEach(item => {
//       console.log("Product ID:", item.productId);  // This should log product details if populated correctly
//     });
  
//     return wishlist.map((x) => x.toObject().productId);
//   }
  
module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishList
}