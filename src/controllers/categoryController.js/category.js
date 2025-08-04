const categoryModel = require("../../models/categoryModel");


exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
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
        const { id, name } = req.body;
        const category = await categoryModel.findByIdAndUpdate(id, { categoryname: name }, {
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
        const id = req.params.id;
        const category = await categoryModel.findByIdAndDelete(id);
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