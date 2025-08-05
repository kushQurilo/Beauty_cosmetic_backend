const { default: mongoose } = require("mongoose");
const userModel = require("../../models/userModel");
const { hashPassword, compareHashPassword } = require("../../utitlies/hashyPassword");
const jwt = require('jsonwebtoken');
const { isValidGST } = require("../../utitlies/gstValidation");
exports.userSignup = async (req, res, next) => {
    try {
        const { name, email, password, address, gstnumber, phone } = req.body;
        if (!name || !email || !password || !address || !gstnumber || !phone) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const gstTest = isValidGST(gstnumber);
        if(!gstTest){
            return res.json({
                success:false,
                message:"Invalid GST Number"
            })
        }
        if(phone.length !==10){
            return res.json({
                success:false,
                message:"Phone number should be 10 digits"
                })
        }
        const payload = { name, email, password:hashPassword(password), address, gstnumber, phone };
        const user = await userModel.create(payload);
        if (!user) {
            return res.status(400).json({ message: "Faild to signup try again", success: false });
        }
        return res.status(200)
            .json({ message: "singup successfully admin will approve your profile.", success: true });
    } catch (error) {
        return res.status(500)
            .json({ success: false, message: error.message })
    }
}

//get single user
exports.getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


//user login 
exports.userLogin = async (req, res, next) => {
   try{
     const { email, password } = req.body;
     if(!email || !password){
        return res.status(400).json({message:"email and password missing" })
        }
      const isUser = await userModel.findOne({email});
      if(isUser){
        const match = compareHashPassword( password,isUser.password);
        if(match){
            const token = jwt.sign({id:isUser._id},process.env.customerKey,{expiresIn:"7d"});
            return res.status(200)
            .json({success:true,message:"login Success",token})
        }
        else{
            return res.status(400).json({message:"invalid password" })
        }
      } else{
        return res.json({success:false,message:"Email Not registered"})
      }
   }catch(error){
    return res.status(500)
    .json({ success: false, message: error.message })
   }
}