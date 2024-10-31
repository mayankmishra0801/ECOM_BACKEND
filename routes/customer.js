const express  = require("express");
const router = express.Router();
const {getCategories} = require("../handlers/category-handler");
const {getFeaturedProduct, getNewProducts} = require("../handlers/product-handler");

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


module.exports = router;