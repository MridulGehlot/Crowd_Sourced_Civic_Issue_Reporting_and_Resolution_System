const User = require("../models/user.model");
const ApiError=require("../utils/ApiError");
const ApiResponse=require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {

    const {name,email,password,phone} = req.body;
    if(!name || !email || !password || !phone) throw new ApiError(400,"All Required Fields Must Be Provided");
    const existingUser = await User.findOne({email});
    if(existingUser) throw new ApiError(409,"User Already Exists");
    const createdUser = await User.create({
        name,
        email,
        password,
        phone
    });
    const user = await User.findById(createdUser._id).select("-password");
    return res.status(201).json(new ApiResponse(201,"User Registered Successfully",user));
});

const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) throw new ApiError(400,"Email and Password are Required");
    const user = await User.findOne({email});
    if(!user) throw new ApiError(401,"Invalid Credentials");
    const isPasswordCorrect = await user.comparePasswords(password);
    if(!isPasswordCorrect) throw new ApiError(401,"Invlaid Credentials");
    const token = user.generateToken();
    const loggedInUser = await User.findById(user._id).select("-password");
    return res.status(200)
    .cookie("token",token,{
        httpOnly:true,
        secure:false, //true in production
        maxAge: 7*24*60*60*1000
    })
    .json(new ApiResponse(200,"Login Successful",loggedInUser));
});

const getMe = asyncHandler(async(req,res)=>{
    return res.json(new ApiResponse(200,"Current User",req.user));
});

module.exports = { register,login,getMe };