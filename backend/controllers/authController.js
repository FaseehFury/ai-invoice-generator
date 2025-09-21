const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//@desc  Register new user
//@route  POST /api/auth/register
//@access public

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name | !email | !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  //check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already existed" });
  }

  //create new user

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }

  try {
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//@desc  login user
//@route  POST /api/auth/login
//@access public

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        bussinessName: user.bussinessName || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//@desc  Get current logged-in user
//@route  PUT /api/auth/me
//@access private

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      bussinessName: user.bussinessName || "",
      address: user.address || "",
      phone: user.phone || "",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//@desc  Update user profile
//@route  PUT /api/auth/me
//@access private

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.bussinessName = req.body.bussinessName || user.bussinessName;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bussinessName: updatedUser.bussinessName,
        address: updatedUser.address,
        phone: updatedUser.phone,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
