import express from "express";

import users from "../data/users.js";
import posts from "../data/posts.js";
import comments from "../data/comments.js";

const router = express.Router();

// GET POSTS
router.get("/posts", (req, res) => {
  const { category } = req.query;

  if (category) {
    const filtered = posts.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );

    return res.json(filtered);
  }

  res.json(posts);
});

// GET USERS
router.get("/users", (req, res) => {
  res.json(users);
});

// GET COMMENTS
router.get("/comments", (req, res) => {
  res.json(comments);
});

// GET POST BY ID
router.get("/posts/:id", (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  res.json(post);
});

// POST
router.post("/posts", (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Title and content required"
    });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    category: category || "general"
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// PATCH
router.patch("/posts/:id", (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  if (req.body.title !== undefined) {
    post.title = req.body.title;
  }

  if (req.body.content !== undefined) {
    post.content = req.body.content;
  }

  if (req.body.category !== undefined) {
    post.category = req.body.category;
  }

  res.json({
    success: true,
    updatedPost: post
  });
});

// DELETE
router.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(
    p => p.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  const deleted = posts.splice(index, 1);

  res.json({
    success: true,
    deleted
  });
});

export default router;