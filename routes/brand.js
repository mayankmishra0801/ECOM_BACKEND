const express = require("express");
const {addBrand,getBrands,getBrand,updateBrand,deleteBrand} = require("../handlers/brand-handler");
const router = express.Router();


router.post("",async(req,res)=>{
    console.log("here");
    let model = req.body;
    let result = await addBrand(model);
    res.send(result);
})

router.put("/:id",async (req,res)=>{
    let model = req.body;
    let id = req.params["id"];
    await updateBrand(id,model);
    res.send({message:"updated"});
})

router.delete("/:id",async (req,res)=>{
    let id = req.params["id"];
    await deleteBrand(id);
    res.send({message:"deleted"})
});

router.get("/:id",async(req,res)=>{
    let id = req.params["id"];
     let brand =   await getBrand(id);
    res.send(brand)
})

router.get("",async(req,res)=>{
    let brands = await getBrands();
    res.send(brands)
})

module.exports = router;



