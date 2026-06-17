const Department = require("../models/department.model");
const ApiError =require("../utils/ApiError");
const ApiResponse =require("../utils/ApiResponse");
const asyncHandler =require("../utils/asyncHandler");

const createDepartment =asyncHandler(async(req,res)=>{
    const {name,description,category} = req.body;
    if(!name ||!category)throw new ApiError(400,"Name and category required");
    const existingDepartment =await Department.findOne({name});
    if(existingDepartment){
        throw new ApiError(
            409,
            "Department already exists"
        );
    }
    const department =await Department.create({name,description,category});
    return res.status(201).json(
        new ApiResponse(
            201,
            "Department created successfully",
            department
        )
    );
});

const getAllDepartments =asyncHandler(async(req,res)=>{
    const departments =
        await Department.find();
    return res.status(200).json(
        new ApiResponse(
            200,
            "Departments fetched",
            departments
        )
    );
});

module.exports = {
    createDepartment,
    getAllDepartments
};