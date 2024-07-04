import express from 'express';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/productController.js';
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

/**
 * @swagger
 * tags:
 *   name: product
 *   description: Endpoints for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [product]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *       404:
 *         description: Products not found
 *       500:
 *         description: Internal server error
 */
productRoutes.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRoutes.get('/:id', getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRoutes.put('/products/:id', updateProductById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRoutes.delete('/products/:id', deleteProductById);

export default productRoutes;
