import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js"
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js"
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import crypto from  "crypto";




export const registerUser = catchAsyncErrors(async(req,res,next) =>{
const {name,email,password}=req.body;
const user=await User.create({
    name,email,password
})
sendToken(user,201,res);

});


export const loginUser = catchAsyncErrors(async(req,res,next) =>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return next(new ErrorHandler ('Please enter email and Password',400))
    }

const user= await User.findOne({email}).select("+password")
 if(!user)
 {
    return next(new ErrorHandler('Invalid email or password',401))
 }

 const isPasswordMatched= await user.comparePassword(password)
 if(!isPasswordMatched){
    return next(new ErrorHandler('Invalid Password',401))
 }

 sendToken(user,200,res);
    });


    export const logout = catchAsyncErrors(async(req,res,next) =>{
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true
        });

        res.status(200).json({
            message: "User is Looged Out",
        })


    })







    
export const forgotPassword = catchAsyncErrors(async(req,res,next) =>{

const user= await User.findOne({email:req.body.email})
 if(!user)
 {
    return next(new ErrorHandler('User not Found',404))
 }

 const resetToken=user.getResetPasswordToken();

 await user.save()


 const resetUrl= `${process.env.FrontEND_URL}/api/v1/password/reset/${resetToken}`;


// const message= getResetPasswordTemplate(user?.name,resetUrl);
const message = getResetPasswordTemplate(user?.name,resetUrl)

try{


    await sendEmail({
        email: user.email,
        subject:"ShopIT Password Recovery",
        message,
    });

    res.status(200).json({
        message:`Email sent Successfully to ${user.email}`
    });

}catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
     return next(new ErrorHandler(error?.message,500));
     console.log("Errorrrrrrrrrrrr");
}



 if(!isPasswordMatched){
    return next(new ErrorHandler('Invalid Password',401))
 }

//  sendToken(user,200,res);




    });


    export const resetPassword= catchAsyncErrors(async(req,res,next)=>{

        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest('hex');

        const user= await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })

        if(!user)
 {
    return next(new ErrorHandler('Password reset link is Invalid or expired',400))
 }
if(req.body.password!==req.body.confirmPassword){
    return next(new ErrorHandler("Passwords doesn't match",400));
}

user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();

sendToken(user,200,res);

    
    });



    export const getUserProfile= catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findById(req?.user?._id);

        res.status(200).json({
            user,
        });
    });



    
    export const updatePassword= catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findById(req?.user?._id).select("+password");

        const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
        if(!isPasswordMatched)
        {
            return next(new ErrorHandler('Old Password is Incorrect',400))
        }

        user.password = req.body.password;
        user.save()






        res.status(200).json({
            success:true,
        });
    });



    
    export const updateProfile= catchAsyncErrors(async(req,res,next)=>{
        const newUserData={
            name:req.body.name,
            email:req.body.email
        }

        const user= await User.findByIdAndUpdate(req.user._id,newUserData,{
            new:true,
        });




        res.status(200).json({
            success:true,
        });
    });


    export const allUsers= catchAsyncErrors(async(req,res,next)=>{
      const users=await User.find();



        res.status(200).json({
            users,
        });
    });


    export const getUsersDetails= catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findById(req.params.id);
  if(!user)
  {
    return next(new ErrorHandler(`User not found with id ${req.params.id}`,404));
  }
  
  
          res.status(200).json({
              user,
          });
      });



      export const updateUser= catchAsyncErrors(async(req,res,next)=>{
        const newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
        };

        const user= await User.findByIdAndUpdate(req.user._id,newUserData,{
            new:true,
        });




        res.status(200).json({
           user,
        });
    });


    
    export const deleteUser= catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findById(req.params.id);
  if(!user)
  {
    return next(new ErrorHandler(`User not found with id ${req.params.id}`,404));
  }


  await user.deleteOne();
  
  
          res.status(200).json({
              success:true,
          });
      });


