
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
        id:{type:Number,required:true},
        productName:{type:String},
        image:{type:String},
        price:{type:Number , },
        productDescription:{type:String},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
