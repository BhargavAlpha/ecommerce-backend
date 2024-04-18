const User =require('../models/user');
exports.profile= async (req,res)=>{
    const { email } = req.params;
  try {
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

exports.updateRequestCount=async(req,res)=>{ 
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.requests_count += 1;
    await user.save();
    res.json({ message: 'Requests count increased successfully', user });
  } catch (error) {
    console.error('Error increasing requests count:', error);
    res.status(500).json({ error: 'Failed to increase requests count' });
  }
}
exports.updateApproveCount=async(req,res)=>{ 
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.requests_approved += 1;
    await user.save();
    res.json({ message: 'Requests count increased successfully', user });
  } catch (error) {
    console.error('Error increasing requests count:', error);
    res.status(500).json({ error: 'Failed to increase requests count' });
  }
}
exports.updateRejectCount=async(req,res)=>{ 
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.requests_rejected += 1;
    await user.save();
    res.json({ message: 'Requests count increased successfully', user });
  } catch (error) {
    console.error('Error increasing requests count:', error);
    res.status(500).json({ error: 'Failed to increase requests count' });
  }
}

