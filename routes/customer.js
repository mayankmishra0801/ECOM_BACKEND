const express  = require("express");
const router = express.Router();
const {getCategories} = require("../handlers/category-handler");
const {getFeaturedProduct, getNewProducts, getProductForListing} = require("../handlers/product-handler");
const { getBrands } = require("../handlers/brand-handler");

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


module.exports = router;