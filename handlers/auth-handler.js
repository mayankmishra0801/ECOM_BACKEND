const User = require("../db/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

async function registerUser(model){

    const hashPassword = await bcrypt.hash(model.password,10);
     let user = new User({
        name:model.name,
        email:model.email,
        password:hashPassword
    

     })
     await user.save();

     
}

async function loginUser(model){
    const user = await User.findOne({email:model.email});
    // find will give array of object as output while findOne will give single object    
    if(!user){
        return null;
    }
    console.log(user,model.password,user.password);

    const isMatched = await bcrypt.compare(model.password,user.password);
    if(isMatched){
         
        const token = jwt.sign({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin

        },"secret",{expiresIn:"1h"});
        return {token,user};

    }else{
        return null;
    }
}

// Function to generate reset token
function generateResetToken(user) {
    return jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
}



async function forgetPassword(req,res){
    const {email} = req.body;
    
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error:"Email not found"});
    }

    const resetToken = generateResetToken(user);


    //send reeset email

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:user.email,
        subject:"Password Reset",


        
        text:`Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`
   
   
   
   
   
    };
      
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.status(500).send(error.toString());
        }

        return res.status(200).send({message:"Password reset link sent"});
    })




    }
// }

async function resetPassword(req, res) {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required" });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
}

// Export the function
// module.exports = { registerUser, loginUser, forgetPassword, resetPassword };


module.exports = {registerUser,loginUser,forgetPassword,resetPassword}