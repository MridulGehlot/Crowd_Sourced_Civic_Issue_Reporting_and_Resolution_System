const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        required: true
    },
    isActive:{
        type:Boolean,
        defalut:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Department",departmentSchema);