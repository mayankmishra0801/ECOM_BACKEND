const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
     const token = req.header('Authorization');
     console.log("kjhjghr",req.header);

     if(!token){
          return res.status(401).send({
            error:"Access denied. No token provided"
          })
     }

     try{
         const decod = jwt.verify(token,"secret");
         console.log("mayank",decod);
         req.user = decod;
         next();
     }catch(err){
        return res.status(400).send({
            error:"Invalid token"
        })
     }
}

function isAdmin(req,res,next){
    if(req.user && req.user.isAdmin){



 

        next();
    }else{
         return res.status(403).send({
            error:"Forbidden"
        })  
    }
}

module.exports = {verifyToken,isAdmin}