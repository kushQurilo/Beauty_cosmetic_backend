const { userSignup, pendingProfiles, getSingleUser } = require('../controllers/userController/userController');

const userRoutes = require('express').Router();
userRoutes.post('/singup',userSignup);
userRoutes.get('/single-user/:id',getSingleUser);
// userRoutes.get('/pending-profile',pendingProfiles);

 module.exports = userRoutes;