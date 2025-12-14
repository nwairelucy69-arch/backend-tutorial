import { Product } from "../model/product.js";

// create product
export const createProduct = async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;
    try {
        const product = await Product.create({
            name,     description,
            price,
            category,
            image,
            stock
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};  

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
};

// get product by id
export const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found", }); 
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update product   
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, image, stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category, image, stock },
            { new: true }
        );  
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;  
    try {
        const product = await Product.findByIdAndDelete(id);        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};
      