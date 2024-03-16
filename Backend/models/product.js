import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter the Product Name"],
        maxLength: [200,"too Large for Product name max is 200"],
    },
    price:{
        type: Number,
        required:[true,"Please Enter Price"],
        maxLength:[5,"Cannot be more than 5 digits"],
    },
    description:{
        type: String,
        required: [true, "Please Enter the Product Description"],
       
    },
    ratings:
    {
        type: Number,
        default:0,
    },
    images:[
    {
        public_id:{
            type: String,
            required: true,
        },
          url: {
            type: String,
            required: true,
          },

    },
],
category:{
    type: String,
    required: [true, "Please Enter the Product Category"],
    enum:{
        values:[
            "Laptops","Electronics","Cameras","Accessories","Headphones","Food","Books","Sports","Home","Outdoor"
        ],
        message:'Please select correct category',
    },
},
seller:{
    type: String,
    required :[true,"Please enter Seller name"],
},
stock:{
    type:Number,
    required:[true, "Please enter the stock"],
},
numOfReviews:{
    type:Number,
    default: 0,
},
reviews:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        rating:{
            type: Number,
            required: true,
        },
        comment:{
            type: String,
            required: true,
        },
    },
],

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
},
    // createdAt:
    // {
    //     type:Date,
    //     default:Date.now,  }
 

   
},
{timestamps: true}
);

export default mongoose.model("Product",productSchema);