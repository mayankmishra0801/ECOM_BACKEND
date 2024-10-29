const Product = require("../db/product");


async function addProduct(model){
//     let product = new Product({
//        ...model
//     });
//     await product.save();
//     return product.toObject();
// }

try {
    let product = new Product({
      ...model,
    });
    await product.save();
    return product.toObject();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error; // re-throwing to handle it in the route as needed
  }

}

async function updateProduct(id,model){
     await Product.findByIdAndUpdate(id,model);
}

async function deleteProduct(id){
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){
    let products = await Product.find();
    return products.map((x)=>x.toObject());
}

async function getProduct(id){
   let  product = await Product.findById(id);
   return product.toObject();
}

async  function getNewProducts(){
     let newProducts = await Product.find({
        isNew:true
     });

     return newProducts.map((x)=> x.toObject());
}

async  function getFeaturedProduct(){
    let featuredProducts = await Product.find({
       isFeatured:true
    });

    return featuredProducts.map((x)=> x.toObject());
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getNewProducts,
    getFeaturedProduct
    
}