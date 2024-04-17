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