const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  videosUrl: {
    type: String,
    required: true,
  },
});

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: "student",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  studentInfo: {
    name: { type: String },
    email: { type: String },
    pic: { type: String },
  },
});

const teacherInfoSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  pic: { type: String },
});

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  studentInfo: {
    name: { type: String },
    email: { type: String },
    pic: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: "teacher",
      required: true,
    },
    teacherInfo: {
      type: [teacherInfoSchema],
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    videos: {
      type: [videoSchema],
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    enrollments: {
      type: [enrollmentSchema],
      default: [],
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
