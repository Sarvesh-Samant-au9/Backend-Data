const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
const Users = require("../../Models/Users");

// @method post
// @route api/post
// @desc Create a post
// @access Private

router.post(
  "/",
  [auth, check("text", "Text is required Here").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await Users.findById(req.user.id).select("-password");
      const newPost = new Post({
        name: user.name,
        text: req.body.text,
        user: req.user.id,
        avatar: user.avatar,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @method get
// @route  api/post
// @desc get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});

// @method get
// @route  api/post/:text_id
// @desc get particular post
// @access Private
router.get("/:text_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.text_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.status(400).send("Internal Server Error");
  }
});

// @method delete
// @route  api/post/:text_id
// @desc delete particular post
// @access Private
router.delete("/:text_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.text_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    // check USER
    if (post.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "Only the author of the post can delete this post" });
    }
    await post.remove();
    res.json({ msg: " Post has been Deleted" });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.status(400).send("Internal Server Error");
  }
});

// @method put
// @route  api/posts/like/:id
// @desc Like particular post
// @access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if User liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "The Post is Already Been Liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});

// @method put
// @route  api/posts/unlike/:id
// @desc dislike particular post
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if User liked the post
    if (
      (post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length = 0)
    ) {
      return res.status(400).json({ msg: "The Post is Not Liked" });
    }
    // Remove Index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: "User Id is Incorrect" });
    }
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});

// @method put
// @route  api/posts/comment/:id
// @desc comment on a particular post
// @access Private

router.put(
  "/comment/:id",
  [auth, check("text", "Comment Cannot Be Empty").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await await Users.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server Error");
    }
  }
);

// @method delete
// @route  api/posts/comment/delete/:id/:comment_id
// @desc delete comment of a particular post
// @access Private

router.delete("/comment/delete/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Take the comment out
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make Sure if comment Exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment not Found" });
    }

    // Check if User is Same
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "Only the author of the post can delete this post" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "User Id is Incorrect" });
    }
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
    
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});

module.exports = router;
