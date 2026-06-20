const ROLES = require("../constants/roles");
const User = require("../models/user.model");
const Issue = require("../models/issue.model");
const ApiError = require("../utils/ApiError");
const ISSUE_STATUS = require("../constants/issueStatus");


//This Function has N+1 Query Problem
const findLeastBusyAuthority = async (departmentId) => {
    const authorities = await User.find({
        role:ROLES.AUTHORITY,
        department:departmentId
    });
    if(!authorities.length) return null;
    let selectedAuhority=null;
    let minimumWorkload=Infinity;
    for(const authority of authorities)
    {
        const activeIssues = await Issue.countDocuments({
            assignedTo:authority._id,
            status:{
                $in: [ISSUE_STATUS.ASSIGNED,ISSUE_STATUS.IN_PROGRESS]
            }
        });
        if(activeIssues<minimumWorkload)
        {
            minimumWorkload=activeIssues;
            selectedAuhority=authority;
        }
    }
    return selectedAuhority;
}

module.exports = findLeastBusyAuthority;