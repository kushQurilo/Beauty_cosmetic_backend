const jwt = require('jsonwebtoken');
const adminAutheication = async(req , res , next)=>{
   try{
     const token = req.headers('authorization').split(' ')[1];
     const adminInfo =  jwt.verify(token,process.env.secretKey);
     if(adminInfo){
        req.admin_id = adminInfo._id
        req.role = adminInfo.role
        next();
     }else{
        res.json({
            status:"failed",
            message:"Invalid token"
        })
     }
   }catch(err){
    return res.status(500)
    .json({message:"Authorization failed",error:err.messge})
   }
}