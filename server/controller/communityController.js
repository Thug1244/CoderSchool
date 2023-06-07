const Post = require("../models/communityModel");
const asyncHandler = require("express-async-handler");

//@description     Get all Posts
//@route           GET /api/posts
//@access          Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("author", "name email pic ");
  res.json(posts);
});

//@description     Get Post by ID
//@route           GET /api/posts/:id
//@access          Public
const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  if (!post) {
    console.log("Post not found");
    return res.sendStatus(404);
  }

  res.json(post);
});

//@description     Create New Post
//@route           POST /api/community/askQuestion
//@access          Protected
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newPost = {
    title,
    content,
    author: req.user,
  };

  try {
    const post = await Post.create(newPost);
    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Update Post
//@route           PUT /api/community/:id
//@access          Protected
const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.sendStatus(404);
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Delete Post
//@route           DELETE /api/community/:id
//@access          Protected
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.sendStatus(404);
    }

    // Check if user is admin or the author of the post
    if (
      req.user.role !== "Admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      console.log("Unauthorized access");
      return res.sendStatus(403);
    }

    await Post.deleteOne({ _id: req.params.id }); // Use deleteOne() to remove the post

    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Get all questions posted by a specific user
// @route   GET /api/community/questions/:userId
// @access  Public
const getUserQuestions = asyncHandler(async (req, res) => {
  const questions = await Post.find({ author: req.params.userId });
  res.json(questions);
});

//@description     Add Comment to Post
//@route           POST /api/community/:id/comments
//@access          Protected
const addCommentToPost = asyncHandler(async (req, res) => {
  const { content, pic } = req.body;

  if (!content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    console.log("Post not found");
    return res.sendStatus(404);
  }

  const newComment = {
    content,
    pic,
    author: req.user._id,
  };

  try {
    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Update Comment
//@route           PUT /api/community/:id/comments/:commentId
//@access          Protected
const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    // Make sure user is authenticated
    if (!req.user || !req.user._id) {
      console.log("User not authenticated");
      return res.sendStatus(401);
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.sendStatus(404);
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      console.log("Comment not found");
      return res.sendStatus(404);
    }

    // Make sure the authenticated user is the author of the comment
    if (comment.author.toString() !== req.user._id.toString()) {
      console.log("Unauthorized access");
      return res.sendStatus(403);
    }

    comment.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Delete Comment
//@route           DELETE /api/community/:id/comments/:commentId
//@access          Protected
const deleteComment = asyncHandler(async (req, res) => {
  try {
    // Make sure user is authenticated
    if (!req.user || !req.user._id) {
      console.log("User not authenticated");
      return res.sendStatus(401);
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.sendStatus(404);
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      console.log("Comment not found");
      return res.sendStatus(404);
    }

    // Check if user is admin or the author of the comment
    if (
      req.user.role !== "Admin" &&
      comment.author.toString() !== req.user._id.toString()
    ) {
      console.log("Unauthorized access");
      return res.sendStatus(403);
    }

    // Use splice() to remove the comment
    post.comments.splice(post.comments.indexOf(comment), 1);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserQuestions,
  addCommentToPost,
  deleteComment,
  updateComment,
};
