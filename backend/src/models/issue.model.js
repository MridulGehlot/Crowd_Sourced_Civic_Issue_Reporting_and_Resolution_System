const mongoose =require("mongoose");
const User = require("../models/user.model");
const ISSUE_CATEGORIES = require("../constants/issueCategories");
const ISSUE_STATUS = require("../constants/issueStatus");
const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:Object.values(ISSUE_CATEGORIES)
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    imageURL:{
        type:String
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        enum: Object.values(ISSUE_STATUS),
        default:ISSUE_STATUS.PENDING
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    resolutionImage:{
        type:String
    },
    resolutionRemark:{
        type:String,
        trim:true
    },
    priority:{
        type:String,
        enum : [
            "low","medium","high"
        ],
        default:"low"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Issue",issueSchema);