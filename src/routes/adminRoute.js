const { adminSignup, adminLogin, searchUser } = require('../controllers/AdminController/createAdminController');
const { adminAuthentication } = require('../middlewares/AdminAuthetication');
const { roleAuthetication } = require('../middlewares/roleBaseAuthe');

const adminRouter = require('express').Router();

adminRouter.post('/signup',adminSignup);
adminRouter.post('/login',adminLogin);
adminRouter.get('/search',searchUser)
module.exports = adminRouter;