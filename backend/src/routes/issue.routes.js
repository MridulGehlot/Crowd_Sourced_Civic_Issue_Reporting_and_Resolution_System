const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

const {createIssue,getAllIssues,getMyIssues,getAssignedIssues,updateStatus,getIssueById} = require("../controllers/issue.controller");
const ROLES = require("../constants/roles");
const authorize = require("../middleware/authorize.middleware");

router.post("/",authMiddleware,createIssue);
router.get("/",authMiddleware,getAllIssues);
router.get("/my",authMiddleware,getMyIssues);
router.get("/assigned",authMiddleware,authorize(ROLES.AUTHORITY),getAssignedIssues);
router.patch("/:id/status",authMiddleware,authorize(ROLES.AUTHORITY,ROLES.ADMIN),updateStatus);
router.get("/:id",authMiddleware,getIssueById);

module.exports = router;