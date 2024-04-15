const express=require('express');
const {authenticateUser}=require('../middlewares/authenticateUser');
const {dashboard,createProduct,getProductById}=require('../controllers/productContoller');
const {profile}=require('../controllers/profileController');
const {getRequests}=require('../controllers/requestsController');

const router=express.Router();
router.get('/product/:id',getProductById)
router.get('/dashboard',dashboard);
router.post('/create-product',createProduct);
router.get('/profile',profile);
router.get('/api/requests',getRequests);
module.exports=router;
