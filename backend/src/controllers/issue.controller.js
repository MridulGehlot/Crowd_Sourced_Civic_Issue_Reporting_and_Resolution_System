const asyncHandler=require("../utils/asyncHandler");
const ApiError=require("../utils/ApiError");
const ApiResponse=require("../utils/ApiResponse");
const Issue = require("../models/issue.model");
const ISSUE_STATUS = require("../constants/issueStatus");
const ROLES = require("../constants/roles");
const { default: mongoose } = require("mongoose");
const findLeastBusyAuthority = require("../services/assignment.service");
const Department = require("../models/department.model");
const createIssue=asyncHandler(async(req,res)=>{
    const {title,description,category,address,imageURL,priority} = req.body;
    if(!title || !description ||!category || !address) throw new ApiError(400,"All Required Fields Must be probvided");
    const department = await Department.findOne(category);
    let assignedAuthority=null;
    if(department)
    {
        assignedAuthority=await findLeastBusyAuthority(department._id);
    }
    const issue = await Issue.create({
        title,
        description,
        category,
        address,
        imageURL,
        priority,
        reportedBy:req.user._id,
        assignedTo: assignedAuthority._id,
        status: assignedAuthority?ISSUE_STATUS.ASSIGNED:ISSUE_STATUS.PENDING
    });
    const createdIssue = await Issue.findById(issue._id)
    .populate(assignedTo,"name email phone");
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

const getAssignedIssues = asyncHandler(async (req,res)=>{
    const issues = await Issue.find({
        assignedTo : req.user._id
    })
    .populate("reportedBy","name email phone")
    .populate("assignedTo","name email phone")
    .sort({createdAt:-1});
    res.status(200).json(new ApiResponse(200,"List of Assgined Issues",issues));
});

const updateStatus = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400,"Invalid Issue id");
    const {status,resolutionRemark,resolutionImage} = req.body;
    const issue = await Issue.findById(id);
    if(!issue) throw new ApiError(404,"Issue Not Found");
    //authority can update only their issue
    if(req.user.role===ROLES.AUTHORITY && issue.assignedTo?.toString() !== req.user._id.toString())
    {
        throw new ApiError(403,"Not Your Assigned Issue");
    }
    const allowedStatuses = [ISSUE_STATUS.IN_PROGRESS,ISSUE_STATUS.REJECTED,ISSUE_STATUS.RESOLVED];
    if(!allowedStatuses.includes(status)) throw new ApiError(400,"Invalid status update");
    if(issue.status === ISSUE_STATUS.ASSIGNED && status !== ISSUE_STATUS.IN_PROGRESS &&
    status !== ISSUE_STATUS.REJECTED){
    throw new ApiError(400,"Issue must move to IN_PROGRESS first");
    }
    if(status === ISSUE_STATUS.RESOLVED && !resolutionRemark){
    throw new ApiError(400,"Resolution remark is required");
    }
    issue.status=status;
    if(resolutionRemark) issue.resolutionRemark=resolutionRemark;
    if(resolutionImage) issue.resolutionImage=resolutionImage;
    await issue.save();
    return res.status(200).json(new ApiResponse(200,"Issue Status Updated Successfully",issue));
});

module.exports = {createIssue,getAllIssues,getMyIssues,getAssignedIssues,updateStatus};