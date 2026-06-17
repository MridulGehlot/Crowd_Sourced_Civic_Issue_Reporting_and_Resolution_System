const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String
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