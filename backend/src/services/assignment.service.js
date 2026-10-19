const ROLES = require("../constants/roles");
const User = require("../models/user.model");
const Issue = require("../models/issue.model");
const ApiError = require("../utils/ApiError");
const ISSUE_STATUS = require("../constants/issueStatus");


const findLeastBusyAuthority = async (departmentId) => {
    const authorities = await User.find({
        role:ROLES.AUTHORITY,
        department:departmentId,
        isActive:true
    });
    if(!authorities.length) return null;
    const workloads = await Issue.aggregate([
        { $match: { assignedTo: { $in: authorities.map((authority) => authority._id) }, status: { $in: [ISSUE_STATUS.ASSIGNED, ISSUE_STATUS.IN_PROGRESS] } } },
        { $group: { _id: "$assignedTo", activeIssues: { $sum: 1 } } }
    ]);
    const workloadByAuthority = new Map(workloads.map((item) => [item._id.toString(), item.activeIssues]));
    return authorities.reduce((selected, authority) => {
        if (!selected) return authority;
        return (workloadByAuthority.get(authority._id.toString()) || 0) < (workloadByAuthority.get(selected._id.toString()) || 0) ? authority : selected;
    }, null);
}

module.exports = findLeastBusyAuthority;