import mongoose from "mongoose"

export const connectDB = async(req,res)=>{
    await mongoose.connect("mongodb://localhost:27017/e-commerce-brainiacs").then(()=>console.log("DB CONNECTED"))
}