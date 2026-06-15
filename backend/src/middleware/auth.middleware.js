const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const ApiError = require("../utils/ApiError")
const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) throw new ApiError(401,"Unauthorized, Please Login");
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");
    if(!user) throw new ApiError(401,"User not found");
    req.user=user;
    next();
});

module.exports = authMiddleware;