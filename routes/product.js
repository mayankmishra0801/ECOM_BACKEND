const express = require("express");
const router = express.Router();
const Product = require("../db/product");
const { addProduct, updateProduct, getProduct, getAllProducts, deleteProduct } = require("../handlers/product-handler");


router.post("",async(req,res)=>{
    //   let model = req.body;
    //   let product =  await addProduct(model)
    //   res.send(product);
    try {
        let model = req.body;
        let product = await addProduct(model);
        res.send(product);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error adding product");
      }
})

router.put("/:id",async(req,res)=>{
    try{
        let model = req.body;
        let id = req.params["id"];
        await updateProduct(id,model);
        res.send({message:"updated"});

    }catch(error){
        console.error(error);
        res.status(500).send("Error updating product");
    }
   
})
router.delete("/:id",async(req,res)=>{
    try{
        let id = req.params["id"];
        await deleteProduct(id);
        res.send({message:"deleted"});

    }catch(error){
        console.error(error);
        res.status(500).send("Error deleting product");
    }
   
})

router.get("/:id",async(req,res)=>{
    try{
        let id = req.params["id"];
         let product = await getProduct(id);
        res.send(product);

    }catch(error){
        console.error(error);
        res.status(500).send("Error getting product");
    }
   
})

router.get("/",async(req,res)=>{
    try{
         let products = await getAllProducts();
        res.send(products);

    }catch(error){
        console.error(error);
        res.status(500).send("Error getting product");
    }
   
})


module.exports = router;