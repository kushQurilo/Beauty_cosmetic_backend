const { adminSignup, adminLogin } = require('../controllers/AdminController/createAdminController');

const adminRouter = require('express').Router();

adminRouter.post('/signup',adminSignup);
adminRouter.post('/login',adminLogin)
module.exports = adminRouter;