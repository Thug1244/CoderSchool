const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  addCommentToPost,
  updateComment,
  deleteComment,
  getUserQuestions,
} = require("../controller/communityController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route to get all posts
router.route("/allQuestions").get(getAllPosts);

// Route to create a new post
router.route("/askQuestion").post(protect, createPost);

// Route to get a post by ID
router.route("/:id").get(getPostById);

// Route to update a post by ID
router.route("/:id").put(protect, updatePost);

// Route to delete a post by ID
router.route("/:id").delete(protect, deletePost);

// Route to get posts by user
router.route("/questions/:userId").get(getUserQuestions);

// Add comment to post
router.route("/:id/comments").post(protect, addCommentToPost);

// Update comment
router.route("/:id/comments/:commentId").put(protect, updateComment);

// Delete comment
router.route("/:id/comments/:commentId").delete(protect, deleteComment);

module.exports = router;
