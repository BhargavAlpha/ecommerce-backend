const Requests= require("../models/requests").Requests;

exports.getRequests= async (req,res)=>{
    try{
        console.log("getRequests");
        const requests=await Requests.find({});
        res.status(200).json(requests);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}