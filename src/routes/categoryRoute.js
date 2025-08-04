const { createCategory, updateCategory, deleteCategory, getAllCategory, getSingleCategory } = require('../controllers/categoryController.js/category');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../models/roleBaseAuthe');

const CategoryRouter = require('express').Router();

CategoryRouter.post('/',adminAuthentication,roleAuthetication('admin'),createCategory);
CategoryRouter.put('/',adminAuthentication,roleAuthetication('admin'),updateCategory);
CategoryRouter.delete('/:id',adminAuthentication,roleAuthetication('admin'),deleteCategory);
CategoryRouter.get('/',adminAuthentication,roleAuthetication('admin'),getAllCategory);
CategoryRouter.get('/:id',adminAuthentication,roleAuthetication('admin'),getSingleCategory)
module.exports = CategoryRouter;

