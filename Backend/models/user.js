import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter your name"],
        maxLength: [50,"Your name cannot exceed 50 Characters"],
    },
    email:{
        type: String,
        required:[true,"Please Enter your email"],
        maxLength: [50,"Your email cannot exceed 50 Characters"],
        unique: true,
    },
    password:{
        type: String,
        required:[true,"Please Enter your Password"],
        minLength: [6,"Your password must be greater than 6 characters"],
        select: false,
    },
    avatar:
    {
        public_id: String,
        url:String,
    },
    role:{
        type: String,
        default:"user",

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

},
{timestamps:true}
);


userSchema.pre('save',async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
}) ;


userSchema.methods.getJwtToken= function(){
   return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    
};



userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}



userSchema.methods.getResetPasswordToken = function(){
    const resetToken=crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest('hex');

    this.resetPasswordExpire=Date.now()+30*60*1000;
    return resetToken;
};

export default mongoose.model("User",userSchema);