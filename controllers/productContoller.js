
const Product =require('../models/product');
exports.dashboard =async (req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
exports.getProductById=async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findOne({id : id});
        if(!product){
            console.log(id);
            return res.status(404).json({error:"Product not found"});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({error:error.message});
}
}
exports.createProduct=async(req,res)=>{
    const axios = require('axios');
    try {
        const apiEndpoint = 'https://fakestoreapi.com/products/';
        const response = await axios.get(apiEndpoint);
    
        
        const apiData = response.data;
    
        for (const item of apiData) {
          const newData = new Product({
            id:item.id,
            productName: item.title,
            productDescription: item.description,
            price: item.price,
            image:item.image,
            
          });
    
          await newData.save();
        }
    
        res.status(201).json({ message: 'Data fetched and stored successfully' });
      } catch (error) {
        console.error('Error fetching and storing API data:', error);
        res.status(500).json({ error: 'Failed to fetch and store API data' });
      }
}

exports.modifyProduct=async(req,res)=>{
  const productId = req.params.id;
  const updatedFields = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    Object.keys(updatedFields).forEach((field) => {
      if (product[field] !== updatedFields[field]) {
        product[field] = updatedFields[field];
      }
    });

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}
    
    
