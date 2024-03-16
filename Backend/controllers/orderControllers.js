import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.js"


export const newOrder= catchAsyncErrors(async(req,res,next)=>{
    const{
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
    } =req.body;


const order =await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user:req.user._id,

});

res.status(200).json({
    order,
})

});


export const myOrders= catchAsyncErrors(async(req,res,next)=>{
    const orders= await Order.find({user: req.user._id}).populate("user","name email");

   

    res.status(200).json({
        orders,
    });
});



export const getOrderDetails= catchAsyncErrors(async(req,res,next)=>{
    const order= await Order.findById(req.params.id)

    if(!order)
    {
        return next(new ErrorHandler('No Order Found with this ID',404))
    }

    res.status(200).json({
        order,
    })
})



export const allOrders= catchAsyncErrors(async(req,res,next)=>{
    const orders= await Order.find();

   

    res.status(200).json({
        orders,
    });
});


export const updateOrder= catchAsyncErrors(async(req,res,next)=>{
    const order= await Order.findById(req.params.id);

    if(!order)
    {
        return next(new ErrorHandler('No Order Found with this ID',404))
    }

    if(order?.orderStatus==="Delivered")
    {
        return next(new ErrorHandler('You have already delivered this Order',400))
    }

order?.orderItems?.forEach(async(item)=>{
    const product =await Product.findById(item?.product?.toString())

if(!product){
    return next(new ErrorHandler("No Product found with this ID"));
}

    product.stock=product.stock- item.quantity;
    await product.save({validateBeforeSave:false});
})

   order.orderStatus=req.body.status;
   order.deliveredAt=Date.now();

   await order.save();

    res.status(200).json({
        success:true,
    });
})


export const deleteOrder= catchAsyncErrors(async(req,res,next)=>{
    const order= await Order.findById(req.params.id)

    if(!order)
    {
        return next(new ErrorHandler('No Order Found with this ID',404))
    }
    await order.deleteOne();

    res.status(200).json({
        success: true,
    })
})


