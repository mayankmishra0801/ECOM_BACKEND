const express = require("express");
const router = express.Router();
const Category = require("../db/category");

const {addCategory,updateCategory, deleteCategory} = require("../handlers/category-handler");   


router.post("",async(req,res)=>{
    console.log("here");
    let model  = req.body;
     let result = await addCategory(model)
     
    res.send(result);

});

router.put("/:id",async(req,res)=>{
    let model = req.body;
    let id = req.params["id"];
    await updateCategory(id,model);
    res.send({message:"ok"});
})

router.delete("/:id",async(req,res)=>{
    let id =  req.params["id"];
    await deleteCategory(id);
    res.send({message:"deleted"});
})

module.exports = router;