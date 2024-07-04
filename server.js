import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouter from './routes/cartRoute.js'; // Import cart routes
import orderRouter from './routes/orderRoute.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import path from 'path';



const app = express();
const _dirname = path.resolve();
// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to DB
connectDB();

// Routes
app.use("/", userRouter);
app.use("/products", productRoutes);
app.use("/cart", cartRouter); // Use cart routes
app.use("/api/order", orderRouter);

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Brainiacs API',
            version: '1.0.0',
            description: 'API for an e-commerce platform',
        },
        servers: [
            {
                url: 'http://localhost:4000/',
            },
        ],
    },
    apis: [
        './routes/*.js'
        // path.resolve(_dirname, 'routes/*js')
    ], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs", 
    swaggerUi.serve, 
    swaggerUi.setup(specs)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
