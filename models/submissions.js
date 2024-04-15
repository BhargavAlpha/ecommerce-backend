const mongoose=require('mongoose');
const Product = require('./product');
const submissions=new mongoose.Schema({
    author:{type:String,required:true},
    ProductId:{type:Number,required:true},
    productName:{type:String},
    status:{type:String,default:'pending'},

})