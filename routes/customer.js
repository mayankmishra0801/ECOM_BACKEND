const express  = require("express");
const router = express.Router();
const {getFeaturedProduct, getNewProducts} = require("../handlers/product-handler");

router.get("/new-products", async  (req, res) =>{
       const products = await getNewProducts();
       res.send(products);
})

router.get("/featured-products", async  (req, res) =>{
        const products = await getFeaturedProduct();
        res.send(products);
})


module.exports = router;