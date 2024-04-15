
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
        // Fetch data from the external API (replace 'apiEndpoint' with the actual API endpoint)
        const apiEndpoint = 'https://fakestoreapi.com/products/';
        const response = await axios.get(apiEndpoint);
    
        // Extract relevant data from the API response (adjust based on the API structure)
        const apiData = response.data;
    
        // Save each API data item to the MongoDB database
        for (const item of apiData) {
          const newData = new Product({
            id:item.id,
            productName: item.title,
            productDescription: item.description,
            price: item.price,
            image:item.image,
            // Map more fields as needed...
          });
    
          await newData.save();
        }
    
        res.status(201).json({ message: 'Data fetched and stored successfully' });
      } catch (error) {
        console.error('Error fetching and storing API data:', error);
        res.status(500).json({ error: 'Failed to fetch and store API data' });
      }
}
    
    
