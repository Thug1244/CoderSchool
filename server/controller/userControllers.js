const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    role,
  });

  if (user) {
    console.log(user.pic);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      //isAdmin: user.isAdmin,
      pic: user.pic,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
//@description     Get or Search all users
//@route           GET http://localhost:5000/api/user/auth?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  //$ne => it means not equal to
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      role: user.role,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@description     Get all teachers
//@route           GET /api/user/teachers
//@access          Private (only accessible to admin)

const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: "Teacher" });
  res.json(teachers);
});

//@description     Get all students
//@route           GET /api/user/students
//@access          Private (only accessible to admin)

const getStudents = asyncHandler(async (req, res) => {
  const students = await User.find({ role: "student" });
  res.json(students);
});

//@description     Remove a user
//@route           DELETE /api/user/:id
//@access          Private (only accessible to admin)

const removeUser = asyncHandler(async (req, res) => {
  if (req.user.role !== "Admin") {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }

  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  allUsers,
  registerUser,
  authUser,
  getUserProfile,
  getTeachers,
  getStudents,
  removeUser,
};
