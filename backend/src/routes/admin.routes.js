const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const ROLES = require("../constants/roles");
const {createAuthority,getAuthorities} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/",authMiddleware,authorize(ROLES.ADMIN),createAuthority);
router.get("/",authMiddleware,authorize(ROLES.ADMIN),getAuthorities);

module.exports = router;