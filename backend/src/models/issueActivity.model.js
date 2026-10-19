const mongoose = require("mongoose");

const issueActivitySchema = new mongoose.Schema({
    issue: { type: mongoose.Schema.Types.ObjectId, ref: "Issue", required: true, index: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true, trim: true },
    previousStatus: { type: String },
    newStatus: { type: String },
    remark: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model("IssueActivity", issueActivitySchema);