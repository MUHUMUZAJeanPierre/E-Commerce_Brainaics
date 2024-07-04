import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config';
import productRoutes from './routes/productRoutes.js';
import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
const app = express();


//middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

//connect to DB
connectDB();


// routes
app.use("/", userRouter);
app.use("/products", productRoutes);
app.use("/cart", cartRouter);
// app.use("/api/order", orderRouter)




const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})