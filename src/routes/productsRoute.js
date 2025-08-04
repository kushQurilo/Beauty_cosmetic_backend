const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, similarProduct, featuredProducts } = require('../controllers/productsController/productController');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../middlewares/roleBaseAuthe');

const ProductsRouter = require('express').Router();
ProductsRouter.post('/',adminAuthentication ,roleAuthetication('admin'),createProduct)
ProductsRouter.get('/',adminAuthentication,roleAuthetication('admin','user'),getAllProducts)
ProductsRouter.get('/single/:id',adminAuthentication,roleAuthetication('admin','user'),getSingleProduct);
ProductsRouter.put('/:id',adminAuthentication,roleAuthetication('admin'),updateProduct);
ProductsRouter.delete('/:id',adminAuthentication,roleAuthetication('admin'),deleteProduct)
ProductsRouter.get('/similar',similarProduct);
ProductsRouter.get('/feature',featuredProducts)
module.exports = ProductsRouter;