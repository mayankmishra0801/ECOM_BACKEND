const Category = require("../db/category");


async function addCategory(model){

   
        let category = new Category({
            name:model.name,
        });
       await category.save();
        return category.toObject();
    }

async function updateCategory(id,model){
   
    await Category.findOneAndUpdate({_id:id},model);
      return;
}
async function deleteCategory(id){
    await Category.findByIdAndDelete(id);
    return;
}

module.exports = {addCategory,updateCategory,deleteCategory}