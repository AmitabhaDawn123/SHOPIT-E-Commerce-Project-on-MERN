import express from 'express'
const app = express()
import dotenv from 'dotenv'
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/error.js';
import cookieParser from "cookie-parser"


process.on('uncaughtException',(err)=>{
    console.log('Error');
    console.log(err);
    console.log("Shutting server due to uncaught exception");
    process.exit(1);
})



dotenv.config({path: 'Backend/config/config.env'});


connectDatabase();
app.use(express.json());
app.use(cookieParser());

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

app.use("/api/v1",productRoutes);
app.use("/api/v1",authRoutes);
app.use("/api/v1",orderRoutes)


app.use(errorMiddleware);



const server=app.listen(process.env.PORT, () => {
    
    console.log("Server started on:");
    console.log(process.env.PORT , process.env.NODE_ENV );
});

process.on('unhandledRejection', (err)=>{
    console.log('Error');
    console.log(err);
    console.log("Shutting the server due to Promise Rejection");
    server.close(()=>{
        process.exit(1);

    }
    );
});
  
