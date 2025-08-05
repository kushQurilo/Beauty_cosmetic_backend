const { userSignup, pendingProfiles, getSingleUser, userLogin } = require('../controllers/userController/userController');

const userRoutes = require('express').Router();
userRoutes.post('/singup',userSignup);
userRoutes.get('/single-user/:id',getSingleUser);
userRoutes.post('/login',userLogin);
// userRoutes.get('/pending-profile',pendingProfiles);

 module.exports = userRoutes;