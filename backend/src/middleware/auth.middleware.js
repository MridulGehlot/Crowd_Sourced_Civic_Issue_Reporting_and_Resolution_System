const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const ApiError = require("../utils/ApiError")
const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) throw new ApiError(401,"Unauthorized, Please Login");
    let decode;
    try {
        decode = jwt.verify(token,process.env.JWT_SECRET);
    } catch {
        throw new ApiError(401,"Session expired or invalid, Please Login");
    }
    const user = await User.findById(decode.id).select("-password");
    if(!user) throw new ApiError(401,"User not found");
    if(!user.isActive) throw new ApiError(403,"Your account is inactive");
    req.user=user;
    next();
});

module.exports = authMiddleware;