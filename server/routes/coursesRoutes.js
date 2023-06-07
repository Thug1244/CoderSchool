const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  leaveCourse,
  addCourseComment,
  deleteCourseComment,
  updateCourseComment,
  getEnrolledStudents,
  getAllReviews,
  deleteCourseVideo,
  updateVideo,
} = require("../controller/coursesController");

const { protect, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.route("/").get(getCourses);

router.route("/:id").get(getCourseById);

// Private Routes
router.route("/").post(protect, authorize(["Teacher", "admin"]), createCourse);

router
  .route("/:id")
  .put(protect, authorize(["Teacher", "admin"]), updateCourse)
  .delete(protect, authorize(["Teacher", "admin"]), deleteCourse);

// Route to get courses by user
router
  .route("/user/:userId")
  .get(protect, authorize(["Teacher", "admin"]), getCourses);

// Route to enroll students
router.route("/:id/enroll").post(protect, enrollInCourse);

//Route to leave students
router.route("/:id/leave").put(protect, leaveCourse);

//Route for students to comment on courses
router.route("/:id/comments").post(protect, addCourseComment);

//Route for students to update comment on courses
router.route("/:id/comments/:commentId").put(protect, updateCourseComment);

//Route for students to delete comment on courses
router.route("/:id/comments/:commentId").delete(protect, deleteCourseComment);

// Add the new route to courseRoutes.js
router.route("/:id/students").get(protect, getEnrolledStudents);

// Route to get all reviews of a post
router.get("/:postId/reviews", getAllReviews);

//Route to update videos
router
  .route("/:id/videos/:videoId")
  .delete(protect, authorize(["Teacher", "admin"]), deleteCourseVideo);

router.put(
  "/:id/videos/:videoId",
  protect,
  authorize(["Teacher", "admin"]),
  updateVideo
);
module.exports = router;
