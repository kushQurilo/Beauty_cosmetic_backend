const { default: mongoose } = require("mongoose");
const ProductModel = require("../../models/productModel");

exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, description, categoryId } = req.body;
        if (!name || !price || !description || !categoryId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const payload = { name, price, description, categoryId };
        const product = await ProductModel.create(payload);
        if (!product) {
            return res.status(400).json({ message: "Failed to create product" });
        }
        res.status(201).json({ message: "Product created successfully", success: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, success: false });
    }
}
// get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(400).json({ message: "No products found" });
        }
        res.status(200).json({ products, success: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, success: false })
    }
}



// get single products 
exports.getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        res.status(200).json({ product, success: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, success: false })
    }
}


// update product
exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productId = new mongoose.Types.ObjectId(id)
        const { name, price, description, categoryId } = req.body;
        if (!name || !price || !description || !categoryId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const payload = { name, price, description, categoryId };
        const product = await ProductModel.findByIdAndUpdate(productId, payload, { new: true });
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        res.status(200).json({ product, success: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, success: false })
    }
}


// delete products
exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productId = new mongoose.Types.ObjectId(id)
        const product = await ProductModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(400).json({ message: "Product not found", success: false });
        }
        return res.status(500)
            .json(
                {
                    success: true,
                    message: "peroduct delete"
                })
    } catch (err) {

        return res.status(500)
            .json(
                {
                    success: false,
                    message: err.message
                })
    }
}