const { default: mongoose } = require("mongoose");
const categoryModel = require("../../models/categoryModel");


exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body; 
        console.log(name)
        if (!name) {
            return res.status(400).json({
                message: "Please enter a category name"
            })
        }
        const category = await categoryModel.create({ categoryname: name });
        if (!category) {
            return res.status(400).json({
                message: "Category not created"
            })
        }
        res.status(201).json({
            message: "Category created successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}


// update category
exports.updateCategory = async (req, res, next) => {
    try {
        const { id} = req.params
        const { name } = req.body;
        const objid = new mongoose.Types.ObjectId(id);
        const category = await categoryModel.findByIdAndUpdate(objid, { categoryname: name }, {
            new: true
        });
        if (!category) {
            return res.status(400).json({
                message: "Category not updated"
            })
        }
        res.status(200).json({
            message: "Category updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

// delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        const id = req.params;
        const catId = new mongoose.Types.ObjectId(id);
        if (!id) {
            return res.status(400).json({
                message: "Invalid id"
            })
        }
        const category = await categoryModel.findByIdAndDelete(catId);
        if (!category) {
            return res.status(400).json({
                message: "Category not deleted"
            })
        }
        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

// get all category

exports.getAllCategory = async (req, res, next) => {
    try {
        const category = await categoryModel.find({});
        if (!category) {
            return res.status(404)
                .json({
                    message: "No categories found",
                })
        }
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        return res.status(500)
            .json({ success: false, message: error.message });
    }
}

// get single category 
exports.getSingleCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const catId = new mongoose.Types.ObjectId(id);
        if (!id) {
            return res.status(400).json({
                message: "Invalid id"
            })
        }
        const singleCategory = await categoryModel.findById(catId);
        if (!singleCategory) {
            return res.status(404)
                .json({
                    message: "Category not found",
                    success: false
                })
        }
        res.status(200).json({
            success: true,
            data: singleCategory
        });
    } catch (err) {
        return res.status(500)
            .json({ success: false, message: err.message })
    }
}


// search category
exports.searchCategory = async (req, res, next) => {
    try {
        const search = req.query;
        console.log(search);
        const query = { categoryname: { $regex: `^${search.search}`, $options: "i" } };
        const category = await categoryModel.find(query);
        if (category.length ===0) {
            return res.status(404)
                .json({
                    success: false,
                    message: "category not found."
                })
        }
        return res.status(200)
            .json({
                success: true,
                data: category
            });
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}