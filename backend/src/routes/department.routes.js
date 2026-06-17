const express = require("express")
const router = express.Router();
const {createDepartment,getAllDepartments} = require("../controllers/department.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const ROLES = require("../constants/roles");

router.post("/",authMiddleware,authorize(ROLES.ADMIN),createDepartment);
router.get("/",getAllDepartments);

module.exports = router;
