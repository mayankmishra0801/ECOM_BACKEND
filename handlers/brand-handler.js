const  Brand = require("../db/brand");

async function getBrands(){
      let brands = await Brand.find();
      // to make mongodb document i.e brands, to convert it to object we willuse map function, and toObject() array we will return 
      return brands.map((x)=>x.toObject());
}

async function getBrand(id){
    let brand = await Brand.findById(id);
    return brand.toObject();

}

async function addBrand(model){
    let brand = new Brand({
        name:model.name

    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id,model){
   await  Brand.findByIdAndUpdate({_id:id},model);
   return;

}

async function deleteBrand(id){
  
    await Brand.findByIdAndDelete(id);
    return

}

module.exports = {getBrands,getBrand,addBrand,updateBrand,deleteBrand};