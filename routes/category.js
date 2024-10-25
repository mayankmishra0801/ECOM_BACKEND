const express = require("express");
const router = express.Router();
const Category = require("../db/category");



router.post("",async(req,res)=>{
    console.log("here");
    let model  = req.body;
    let category = new Category({
        
        name: model.name

    })
    category.save();
    res.send(category.toObject());

});

module.exports = router;