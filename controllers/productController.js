import productModel from "../models/productModels.js";
import fs from 'fs';

export const addProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", success: false });
        }
        let image_filename = `${req.file.filename}`;
        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });
        await product.save();
        res.status(201).json({ message: "Product added successfully", product, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product", success: false });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ message: "Products found", data: products, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving products", status: false });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", status: false });
        }
        res.status(200).json({ message: "Product found", data: product, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving product", status: false });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { name, description, price, category} = req.body;
        let updatedFields = { name, description, price, category };

        if (req.file) {
            let image_filename = req.file.filename;
            updatedFields.image = image_filename;

            const product = await productModel.findById(req.params.id);
            if (product.image) {
                fs.unlinkSync(`uploads/${product.image}`);
            }
        }

        const product = await productModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found", status: false });
        }
        res.status(200).json({ message: "Product updated successfully", data: product, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product", status: false });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", status: false });
        }
        if (product.image) {
            fs.unlinkSync(`uploads/${product.image}`);
        }
        res.status(200).json({ message: "Product deleted successfully", data: product, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product", status: false });
    }
};
