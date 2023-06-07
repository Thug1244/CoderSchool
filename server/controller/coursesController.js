const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .populate("teacher", "name email")
    .populate("student", "name email email pic")
    .populate("price");

  res.json(courses);
});

// @desc    Get a course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("teacher", "name email")
    .populate("enrollments.student", "name email pic ")
    .populate("price");

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json(course);
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Teacher or Admin

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, videos, thumbnailUrl, price } = req.body;

  if (!title || !description || !videos || !thumbnailUrl || !price) {
    res.status(400);
    throw new Error("Invalid course data");
  }
  const newCourse = {
    title,
    description,
    teacher: req.user._id,
    videos,
    thumbnailUrl,
    teacherInfo: [],
    price,
  };
  newCourse.teacherInfo.push({
    name: req.user.name,
    email: req.user.email,
    pic: req.user.pic,
  });

  const course = await Course.create(newCourse);

  // populate the teacher field to get the teacher's details
  // await course.populate("teacher", "name email pic").execPopulate();

  res.status(201).json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Teacher or Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Only the teacher or admin can update the course
  if (
    course.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to update this course");
  }

  // Update the fields that are included in the request body
  if (req.body.title) {
    course.title = req.body.title;
  }
  if (req.body.description) {
    course.description = req.body.description;
  }
  if (req.body.videos) {
    course.videos = req.body.videos;
  }
  if (req.body.thumbnailUrl) {
    course.thumbnailUrl = req.body.thumbnailUrl;
  }

  const updatedCourse = await course.save();
  res.json(updatedCourse);
});

// @desc    Update individual video fields (title, description, link)
// @route   PUT /api/courses/:id/videos/:videoId
// @access  Private/Teacher or Admin
const updateVideo = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Only the teacher or admin can update the video
  if (
    course.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to update this video");
  }

  // Find the video index
  const videoIndex = course.videos.findIndex(
    (video) => video._id.toString() === req.params.videoId
  );

  if (videoIndex === -1) {
    res.status(404);
    throw new Error("Video not found");
  }

  const video = course.videos[videoIndex];

  // Update the video fields that are included in the request body
  if (req.body.videoTitle) {
    video.title = req.body.videoTitle;
  }
  if (req.body.videoDescription) {
    video.description = req.body.videoDescription;
  }
  if (req.body.videoLink) {
    video.videosUrl = req.body.videoLink;
  }

  // Update the video in the course
  course.videos[videoIndex] = video;

  const updatedCourse = await course.save();
  res.json(updatedCourse);
});

// @desc    Delete a course video
// @route   DELETE /api/courses/:id/videos/:videoId
// @access  Private/Teacher or Admin
const deleteCourseVideo = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Only the teacher or admin can update the course
  if (
    course.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to update this course");
  }

  const videoIndex = course.videos.findIndex(
    (video) => video._id.toString() === req.params.videoId
  );
  if (videoIndex !== -1) {
    course.videos.splice(videoIndex, 1);
  } else {
    res.status(404);
    throw new Error("Video not found");
  }

  const updatedCourse = await course.save();
  res.json(updatedCourse);
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Teacher or Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Only the teacher or admin can delete the course
  if (
    course.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this course");
  }

  await course.deleteOne();
  res.json({ message: "Course removed" });
});

// @desc    Get all enrolled students in a course
// @route   GET /api/courses/:id/students
// @access  Private/Teacher or Admin
const getEnrolledStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    "enrollments.student",
    "name email pic"
  );

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Only the teacher or admin can view the enrolled students
  if (
    course.teacher.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to view enrolled students");
  }

  res.json(course.enrollments);
});

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student

const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Check if the student is already enrolled in the course
  const isEnrolled = course.enrollments.some(
    (enrollment) => enrollment.student.toString() === req.user._id.toString()
  );

  if (isEnrolled) {
    res.status(400);
    throw new Error("You are already enrolled in this course");
  }

  // Retrieve student information from the User model
  const student = await User.findById(req.user._id).select("name email pic");

  // Add the student to the course's enrollments array with their info
  course.enrollments.push({
    student: req.user._id,
    studentInfo: {
      name: student.name,
      email: student.email,
      pic: student.pic,
    },
  });
  await course.save();

  res.json({ message: "Enrolled in the course successfully" });
});

// @desc    Leave a course
// @route   PUT /api/courses/:id/leave
// @access  Private/Student
const leaveCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Check if the student is enrolled in the course
  const enrollment = course.enrollments.find(
    (enrollment) => enrollment.student.toString() === req.user._id.toString()
  );

  if (!enrollment) {
    res.status(400);
    throw new Error("You are not enrolled in this course");
  }

  // Remove the student from the course's enrollments array
  course.enrollments = course.enrollments.filter(
    (enrollment) => enrollment.student.toString() !== req.user._id.toString()
  );
  await course.save();

  res.json({ message: "Left the course successfully" });
});

// @desc    Add a comment to a course
// @route   POST /api/courses/:id/comments
// @access  Private/Student

const addCourseComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Retrieve student information from the User model
  const student = await User.findById(req.user._id).select("name email pic");

  const comment = {
    student: req.user._id,
    user: req.user,
    studentInfo: {
      name: student.name,
      email: student.email,
      pic: student.pic,
    },
    content,
  };

  course.comments.push(comment);

  await course.save();

  res.status(201).json({ message: "Comment added successfully", comment });
});

// @desc    Update a comment on a course
// @route   PUT /api/courses/:id/comments/:commentId
// @access  Private/Student

const updateCourseComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { id: courseId, commentId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  const commentIndex = course.comments.findIndex((c) => c._id == commentId);

  if (commentIndex === -1) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const comment = course.comments[commentIndex];

  if (
    !comment ||
    !comment.user ||
    comment.user.toString() !== req.user._id.toString()
  ) {
    res.status(401);
    throw new Error("You are not authorized to update this comment");
  }

  comment.content = content;

  await course.save();

  res.json({ message: "Comment updated successfully", comment });
});

// @desc    Delete a comment from a course
// @route   DELETE /api/courses/:id/comments/:commentId
// @access  Private/Student
const deleteCourseComment = asyncHandler(async (req, res) => {
  const { id: courseId, commentId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  const commentIndex = course.comments.findIndex((c) => c._id == commentId);

  if (commentIndex === -1) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const comment = course.comments[commentIndex];
  //console.log(comment);
  if (!comment.user || comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    //console.log(comment.student);
    console.log(req.user._id);
    throw new Error("You are not authorized to delete this comment");
  }

  course.comments.splice(commentIndex, 1);

  await course.save();

  res.json({ message: "Comment deleted successfully" });
});
// Controller function to get all reviews of a post
const getAllReviews = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId).populate({
    path: "reviews",
    populate: { path: "user", select: "name email pic" },
  });

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json(reviews);
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getEnrolledStudents,
  leaveCourse,
  addCourseComment,
  deleteCourseComment,
  updateCourseComment,
  getAllReviews,
  deleteCourseVideo,
  updateVideo,
};
