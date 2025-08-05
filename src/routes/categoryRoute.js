const { createCategory, updateCategory, deleteCategory, getAllCategory, getSingleCategory, searchCategory } = require('../controllers/categoryController.js/category');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../middlewares/roleBaseAuthe');

const CategoryRouter = require('express').Router();
CategoryRouter.get('/search_cate',searchCategory);
CategoryRouter.post('/',adminAuthentication,roleAuthetication('admin'),createCategory);
CategoryRouter.put('/',adminAuthentication,roleAuthetication('admin'),updateCategory);
CategoryRouter.delete('/:id',adminAuthentication,roleAuthetication('admin'),deleteCategory);
CategoryRouter.get('/',adminAuthentication,getAllCategory);
CategoryRouter.get('/:id',adminAuthentication,getSingleCategory);

module.exports = CategoryRouter;

