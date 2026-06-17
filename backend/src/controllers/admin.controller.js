const ROLES = require("../constants/roles");
const Department = require("../models/department.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createAuthority = asyncHandler(async (req,res)=>{
    const {name,email,password,department,phone} = req.body;
    if(!name || !email || !password || !department || !phone) throw new ApiError(400,"All Fields Are Required");
    const d = await Department.find({category:department});
    if(!d) throw new ApiError(404,"No Department Found");
    const existingUser = await User.findOne({email});
    if(existingUser) throw new ApiError(409,"User Already Exists");
    const user = await User.create({
        name,
        email,
        password,
        phone,
        role:ROLES.AUTHORITY,
        department : d._id,
    });
    const u = await User.findById(user._id).select("-password")
    .populate("department","name category");
    return res.status(201).json(new ApiResponse(201,"Authority Created",u));
});

const getAuthorities = asyncHandler(async (req,res)=>{
    const authorities = await User.find({role:ROLES.AUTHORITY}).populate("department","name category");
    return res.status(200).json(new ApiResponse(200,"List of All Authorities",authorities));
});

module.exports = {createAuthority,getAuthorities};