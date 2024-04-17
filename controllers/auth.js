const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
  try {
    const { username, email,password,userType }=req.body;
    if (!username || !email || !password || !userType) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(409).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: userType === "admin",
    });

    await newUser.save();

    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 6000,
    });
    res.status(201).json({
      message: "User registered successfully",
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email = "", password } = req.body;
    console.log(email,password);
    if((email === "" ) || !password){
      res.send("provide all fields correctly")
    }
    User.findOne({email})
    .then((user) => {
      if (!user) {
        console.log("Invalid email or mobile");
        return res.status(401).json({ error: "Invalid email or mobile" });
      }

      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err || !passwordMatch) {
          return res.status(401).json({ error: "pass missmatch" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: 600,
        });
        res
          .status(200)
          .json({ message: "Login successful", email: user.email, token, isAdmin: user.isAdmin,userId:user._id});
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to login" ,err:err.message});
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}
  