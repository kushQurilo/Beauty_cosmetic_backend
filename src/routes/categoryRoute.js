const { createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController.js/category');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../models/roleBaseAuthe');

const CategoryRouter = require('express').Router();

CategoryRouter.post('/',adminAuthentication,roleAuthetication('admin'),createCategory);
CategoryRouter.put('/',adminAuthentication,roleAuthetication('admin'),updateCategory);
CategoryRouter.delete('/',adminAuthentication,roleAuthetication('admin'),deleteCategory);

module.exports = CategoryRouter;