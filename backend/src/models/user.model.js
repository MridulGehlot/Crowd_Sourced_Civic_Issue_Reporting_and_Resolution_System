const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const ROLES = require("../constants/roles");
const DEPARTMENTS = require("../constants/departments");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        default:ROLES.CITIZEN
    },
    department:{
        type:String,
        enum:Object.values(DEPARTMENTS)
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        return;
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePasswords = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateToken = function(){

    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports=mongoose.model("User",userSchema);