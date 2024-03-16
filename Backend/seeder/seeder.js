import mongoose from "mongoose";
import products from "./data.js";
import product from "../models/product.js";



const seedProducts=async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/shopit");
        await product.deleteMany();
        console.log('Products are deleted');
        await product.insertMany(products);
        console.log('Products are added');
    }
    catch(error){
        console.log(error.message);
        process.exit();
    }

};
seedProducts();