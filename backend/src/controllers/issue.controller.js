const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Issue = require("../models/issue.model");
const ISSUE_STATUS = require("../constants/issueStatus");
const ROLES = require("../constants/roles");
const { default: mongoose } = require("mongoose");
const findLeastBusyAuthority = require("../services/assignment.service");
const Department = require("../models/department.model");
const IssueActivity = require("../models/issueActivity.model");

const createIssue = asyncHandler(async (req, res) => {
    const { title, description, category, address, imageURL, priority } = req.body;
    if (!title || !description || !category || !address) throw new ApiError(400, "All Required Fields Must be provided");

    const department = await Department.findOne({ category, isActive: true });
    let assignedAuthority = null;
    if (department) {
        assignedAuthority = await findLeastBusyAuthority(department._id);
    }

    const issue = await Issue.create({
        title,
        description,
        category,
        address,
        imageURL,
        priority,
        reportedBy: req.user._id,
        assignedTo: assignedAuthority?._id || null,
        status: assignedAuthority ? ISSUE_STATUS.ASSIGNED : ISSUE_STATUS.PENDING
    });

    const createdIssue = await Issue.findById(issue._id).populate("assignedTo", "name email phone");
    await IssueActivity.create({ issue: issue._id, actor: req.user._id, action: "Issue reported", newStatus: issue.status });
    if (assignedAuthority) {
        await IssueActivity.create({ issue: issue._id, actor: assignedAuthority._id, action: "Issue assigned", newStatus: issue.status });
    }
    return res.status(201).json(new ApiResponse(201, "Issue reported successfully", createdIssue));
});

const getAllIssues = asyncHandler(async (req, res) => {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 12, 1), 50);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
        const search = req.query.search.trim();
        if (search) filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } }
        ];
    }
    const [issues, totalItems] = await Promise.all([
        Issue.find(filter)
            .select("title description category address imageURL status priority createdAt assignedTo resolutionImage resolutionRemark")
            .populate("assignedTo", "name")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Issue.countDocuments(filter)
    ]);
    return res.status(200).json(new ApiResponse(200, "Issues fetched successfully", {
        items: issues,
        pagination: { page, limit, totalItems, totalPages: Math.ceil(totalItems / limit) }
    }));
});

const getMyIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({ reportedBy: req.user._id })
        .populate("reportedBy", "name email role")
        .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "Issues fetched successfully", issues));
});

const getAssignedIssues = asyncHandler(async (req, res) => {
    const issues = await Issue.find({
        assignedTo: req.user._id
    })
        .populate("reportedBy", "name email phone")
        .populate("assignedTo", "name email phone")
        .sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "List of Assigned Issues", issues));
});

const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Issue id");
    const { status, resolutionRemark, resolutionImage } = req.body;
    const issue = await Issue.findById(id);
    if (!issue) throw new ApiError(404, "Issue Not Found");

    if (req.user.role === ROLES.AUTHORITY && issue.assignedTo?.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not Your Assigned Issue");
    }

    const allowedStatuses = [ISSUE_STATUS.IN_PROGRESS, ISSUE_STATUS.REJECTED, ISSUE_STATUS.RESOLVED];
    if (!allowedStatuses.includes(status)) throw new ApiError(400, "Invalid status update");
    const validTransitions = {
        [ISSUE_STATUS.ASSIGNED]: [ISSUE_STATUS.IN_PROGRESS, ISSUE_STATUS.REJECTED],
        [ISSUE_STATUS.IN_PROGRESS]: [ISSUE_STATUS.RESOLVED, ISSUE_STATUS.REJECTED]
    };
    if (!validTransitions[issue.status]?.includes(status)) throw new ApiError(400, "Invalid issue status transition");
    if (status === ISSUE_STATUS.RESOLVED && !resolutionRemark) {
        throw new ApiError(400, "Resolution remark is required");
    }

    const previousStatus = issue.status;
    issue.status = status;
    if (resolutionRemark) issue.resolutionRemark = resolutionRemark;
    if (resolutionImage) issue.resolutionImage = resolutionImage;
    await issue.save();
    await IssueActivity.create({
        issue: issue._id,
        actor: req.user._id,
        action: `Status changed to ${status}`,
        previousStatus,
        newStatus: status,
        remark: resolutionRemark
    });
    return res.status(200).json(new ApiResponse(200, "Issue Status Updated Successfully", issue));
});

const getIssueById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Issue id");
    const issue = await Issue.findById(id)
        .select("title description category address imageURL status priority createdAt assignedTo resolutionImage resolutionRemark")
        .populate("assignedTo", "name");
    if (!issue) throw new ApiError(404, "Issue Not Found");
    const activities = await IssueActivity.find({ issue: id })
        .populate("actor", "name role")
        .sort({ createdAt: 1 });
    return res.status(200).json(new ApiResponse(200, "Issue Details", { issue, activities }));
});

module.exports = { createIssue, getAllIssues, getMyIssues, getAssignedIssues, updateStatus, getIssueById };