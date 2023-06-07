const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserProfile,
  getTeachers,
  getStudents,
  removeUser,
} = require("../controller/userControllers");

const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/auth").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/teachers").get(protect, getTeachers);
router.route("/students").get(protect, getStudents);
router.route("/:id").delete(protect, removeUser);

module.exports = router;
