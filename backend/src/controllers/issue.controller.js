const asyncHandler=require("../utils/asyncHandler");
const ApiError=require("../utils/ApiError");
const ApiResponse=require("../utils/ApiResponse");
const Issue = require("../models/issue.model");

const createIssue=asyncHandler(async(req,res)=>{
    const {title,description,category,address,imageURL,priority} = req.body;
    if(!title || !description ||!category || !address) throw new ApiError(400,"All Required Fields Must be probvided");
    const issue = await Issue.create({
        title,
        description,
        category,
        address,
        imageURL,
        priority,
        reportedBy:req.user._id
    });
    return res.status(200).json(new ApiResponse(201,"Issue reported successfully",issue));
});

const getAllIssues = asyncHandler(async (req,res)=>{
    const issues=await Issue.find()
    .populate("reportedBy","name email role")
    .sort({createdAt:-1});
    return res.status(200).json(new ApiResponse(200,"Issues fetched successfully",issues));
});

const getMyIssues = asyncHandler(async (req,res)=>{
    const issues=await Issue.find({reportedBy:req.user._id})
    .populate("reportedBy","name email role")
    .sort({createdAt:-1});
    return res.status(200).json(new ApiResponse(200,"Issues fetched successfully",issues));
});

module.exports = {createIssue,getAllIssues,getMyIssues};