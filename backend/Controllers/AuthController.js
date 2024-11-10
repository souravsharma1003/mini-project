const UserModel = require("../Models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async (req,res)=>{
    try {
        const {email,username,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'User already exists,you can login',success:false});
        }
        const userModel=new UserModel({email,username,password});
        userModel.password=await bcrypt.hash(password,10); 
        await userModel.save();  
        res.status(201)
           .json({
                message:"User Registered Successfully...",
                success:true,
                username:userModel.username,
                email:userModel.email
           })
    } catch(err) {
        res.status(500)
           .json({
                message:"Internal Server Error",
                success:false
           })
    }
}

const login=async (req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await UserModel.findOne({username});

        if(!user){
            return res.status(403)
            .json({message:`User doesn't exist.Please sign up first`,success:false});
        }
        const isPassEqual= await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message:`Either username or password is wrong`,success:false});
        }
        const jwtToken=jwt.sign(
            {username:user.username,_id:user._id},
            "secret-123",
            {expiresIn:'24h'}
        )
        res.status(200)
           .json({
                message:'Login Success...',
                success:true,
                jwtToken,
                username,
                email:user.email

           })
    } catch(err) {
        res.status(500)
           .json({
                message:"Internal Server Error",
                success:false
           })
    }
}

module.exports={
    signup,
    login
}