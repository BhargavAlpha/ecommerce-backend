const Requests= require("../models/requests").Requests;

exports.getRequests= async (req,res)=>{
    try{
        console.log("getRequests");
        const requests=await Requests.find({status:"pending"});
        res.status(200).json(requests);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.mySubmissions = async (req, res) => {
    try {
      const email = req.query.email; 
      const requests = await Requests.find({ email: email });
      for(let i=0;i<requests.length;i++){
         console.log(requests[i]);
      }
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getRequestById=async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Requests.findOne({_id : id});
        console.log(product);
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
exports.submitRequest=async(req,res)=>{
    try{
        const {email,productName,price,productDescription,image,productId}=req.body;
        const request=new Requests({email,productName,price,productDescription,image,productId});
        await request.save();
        res.status(201).json(request);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
}

exports.modifyRequest=async(req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedReview = await Requests.findByIdAndUpdate(
        id,
        { status }, // Update only the 'status' field
        { new: true } // Return the updated document
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.json(updatedReview);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}



    