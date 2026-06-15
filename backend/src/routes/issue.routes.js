const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

const {createIssue,getAllIssues,getMyIssues} = require("../controllers/issue.controller");

router.post("/",authMiddleware,createIssue);
router.get("/",authMiddleware,getAllIssues);
router.get("/my",authMiddleware,getMyIssues);

module.exports = router;