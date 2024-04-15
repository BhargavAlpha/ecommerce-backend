const mongoose=require('mongoose');
const requests=new mongoose.Schema({
    productName:{type:String},
    productId:{type:Number,required:true},
    productDescription: { type: String},
    email: {type:String,required:true},
    status:{type:String,default:'pending'},
    image:{type:String},
    price:{type:Number}
})
exports.Requests=mongoose.model('Requests',requests)