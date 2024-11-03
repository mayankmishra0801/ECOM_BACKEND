const express  = require("express");
const router = express.Router();
const {getCategories} = require("../handlers/category-handler");
const {getFeaturedProduct, getNewProducts, getProductForListing} = require("../handlers/product-handler");
const { getBrands } = require("../handlers/brand-handler");
const {getProduct} = require("../handlers/product-handler");
const {getWishList,addToWishlist,removeFromWishlist} = require("../handlers/wishlist-handler");


const {addOrder,getCustomerOrders} = require("../handlers/order-handler");
const {getCartItems,addToCart,removefromCart,clearCart} = require("../handlers/shopping-cart-handler");
router.get("/new-products", async  (req, res) =>{
       const products = await getNewProducts();
       res.send(products);
})

router.get("/featured-products", async  (req, res) =>{
        const products = await getFeaturedProduct();
        res.send(products);
});

router.get("/categories",async(req,res)=>{
    let categories = await getCategories();
    res.send(categories);
})

router.get("/brands",async(req,res)=>{
    let brands = await getBrands();
    res.send(brands);
})

router.get("/products",async(req,res)=>{
    const {searchTerm,categoryId,sortOrder,sortBy,brandId,pageSize,page} = req.query;
    //do not use req.query
    const products = await getProductForListing(searchTerm,categoryId,pageSize,page,sortOrder,sortBy,brandId);
    res.send(products);
})

router.get("/product/:id",async(req,res)=>{
    const id = req.params["id"];
    const product = await getProduct(id);
    res.send(product);
})

router.get("/wishlists",async(req,res)=>{
try{


    const userId = req.user.id;
    const productId = req.params.id;
    const items = await getWishList(userId,productId);
    res.send(items);
} catch(error){
    console.error(error);
    res.status(500).send("Error getting wishlist");
}   
   
 })


 router.post("/wishlists/:id",async(req,res)=>{
    try{

        const userId = req.user.id;
        const productId = req.params.id;
        const item = await addToWishlist(userId,productId);
        res.send(item);

    }catch(error){
        console.error(error);
        res.status(500).send("Error adding product to wishlist");
    }
 })

 router.delete("/wishlists/:id",async(req,res)=>{
    try{

        const userId = req.user.id;
        const productId = req.params.id;
        await removeFromWishlist(userId,productId);
        res.send({message:"Ok"});

    }catch(error){
        console.error(error);
        res.status(500).send("Error deleting product from wishlist");
    }
 })


  router.get("/carts",async(req,res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const items = await getCartItems(userId);
    res.send(items);
  })


  router.post("/carts/:id",async(req,res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId,productId,quantity);
    res.send(items);
  })

  router.delete("/carts/:id",async(req,res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await removefromCart(userId,productId,quantity);
    res.send(items);
  })


  router.post("/order",async(req,res)=>{
    const userId = req.user.id;
    const order = req.body;

    await addOrder(userId,order);
    await  clearCart(userId);


    return res.send({message:"Order created"});

})

router.get("/orders",async(req,res)=>{
    const userId = req.user.id;
     const orders = await getCustomerOrders(userId);
     
     return res.send(orders)

})


module.exports = router;