import { set } from 'mongoose';
import ErrorHandler from '../utils/errorHandler.js'


export default(err,req,res,next)=>{
    let error={
        ststusCode:err?.statusCode || 500,
        message:err?.message || 'Internal Server error'
    };



    if(err.name==='CastError'){
        var errpath=err?.path;
        const message='Resource not found. Invalid:'  +(errpath);
        
        error=new ErrorHandler(message,404)
    }

    if(err.code==="JsonWebTokenError"){
       
        const message=`JSON Web Token is Invalid`;
        
        error=new ErrorHandler(message,400)
    }

    if(err.code==="TokenExpiredError"){
       
        const message=`JSON Web Token is Expired`;
        
        error=new ErrorHandler(message,400)
    }

    if(err.code===11000){
        var errpath=err?.path;
        const message=`Duplicate ${Object.keys(err.keyValue)} emtered`;
        
        error=new ErrorHandler(message,404)
    }



    if(err.name==='ValidationError'){
        var errpath=err?.path;
        const message=Object.values(err,error).map((value)=> value.message);
        
        error=new ErrorHandler(message,404)
    }



    if(process.env.NODE_ENV === "DEVELOPMENT")
    {
        if(err.statusCode>=100 && err.statusCode<500){
        res.status(err.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        });
    }
    else{
        res.status(500).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        });

    }

    }

    if(process.env.NODE_ENV==="PRODUCTION"){
        res.status(err.statusCode).json({
            message:error.message,
        });

    }

   
};