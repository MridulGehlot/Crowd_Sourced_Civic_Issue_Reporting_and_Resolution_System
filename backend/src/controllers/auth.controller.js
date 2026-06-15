const User = require("../models/user.model");

const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {

    const user = await User.create({
        name: "Mridul",
        email: "mridul@gmail.com",
        password: "123456"
    });

    res.json(user);
});

module.exports = { register };