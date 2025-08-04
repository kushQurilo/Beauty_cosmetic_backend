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
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const products = await ProductModel.find({})
            .skip(skip)
            .limit(limit);

        const totalProducts = await ProductModel.countDocuments();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found", success: false });
        }

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalResults: totalProducts,
            products
        });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};



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


// similor product
exports.similarProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Please category product id", success: false });
        }
        const catId = new mongoose.Types.ObjectId(id)
        const product = await ProductModel.find({ categoryId: catId })
        if (!product) {
            return res.status(400).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ product, success: true });
    }
    catch (err) {
        return res.status(500)
            .json(
                {
                    success: false,
                    message: err.message
                })

    }
}
exports.similarProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid or missing product id", success: false });
        }

        const currentProduct = await ProductModel.findById(id);
        if (!currentProduct) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        const similarProducts = await ProductModel.find({
            categoryId: currentProduct.categoryId,
            _id: { $ne: currentProduct._id }
        })
            .skip(skip)
            .limit(limit);

        const totalSimilar = await ProductModel.countDocuments({
            categoryId: currentProduct.categoryId,
            _id: { $ne: currentProduct._id }
        });

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalSimilar / limit),
            totalResults: totalSimilar,
            products: similarProducts
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};