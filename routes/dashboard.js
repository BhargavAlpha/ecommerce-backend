const express=require('express');
const {authenticateUser}=require('../middlewares/authenticateUser');
const {dashboard,createProduct,getProductById,modifyProduct}=require('../controllers/productContoller');
const {profile}=require('../controllers/profileController');
const {getRequests,mySubmissions,getRequestById,modifyRequest}=require('../controllers/requestsController');

const router=express.Router();
router.get('/product/:id',getProductById)
router.put('/product/:id',modifyProduct)
router.get('/dashboard',dashboard);
router.post('/create-product',createProduct);
router.get('/profile/:email',profile);
router.get('/requests',getRequests);
router.put('/reviews/:id',modifyRequest);
router.get('/api/my-submissions',mySubmissions);
router.get('/reviews/:id',getRequestById);

module.exports=router;
