const { createCategory, updateCategory, deleteCategory, getAllCategory, getSingleCategory, searchCategory } = require('../controllers/categoryController.js/category');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../middlewares/roleBaseAuthe');

const CategoryRouter = require('express').Router();
CategoryRouter.get('/search_cate',searchCategory);
CategoryRouter.post('/',adminAuthentication,roleAuthetication('admin'),createCategory);
CategoryRouter.put('/:id',adminAuthentication,roleAuthetication('admin'),updateCategory);
CategoryRouter.delete('/:id',adminAuthentication,roleAuthetication('admin'),deleteCategory);
CategoryRouter.get('/',getAllCategory);
CategoryRouter.get('/:id',getSingleCategory);

module.exports = CategoryRouter;

