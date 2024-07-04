import express from 'express';
import {addProduct,deleteProductById,getAllProducts, getProductById,updateProductById } from '../controllers/productController.js';
import multer from "multer";

const productRoutes = express.Router();


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  
const upload = multer({ storage: storage });

productRoutes.post('/', upload.single("image"), addProduct);
productRoutes.get('/', getAllProducts);

productRoutes.get('/products/:id', getProductById);
productRoutes.put('/:id ', updateProductById);
productRoutes.delete('/:id', deleteProductById);

export default productRoutes;


