import express from "express";
import users from "../users.js";
import posts from "../posts.js"
import comments from "../comments.js";

const router = express.router();

// GET all posts (optionally filter by category)
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

// GET all users
router.get("/users", (req, res) => {
    res.json(users);
});

// GET all comments
router.get("/comments", (req, res) => {
    res.json(comments);
});

// GET single post by ID
router.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const targetPost = posts.find(p => p.id === id);

    if (!targetPost) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    res.json(targetPost);
});

// CREATE a new post
router.post("/posts", (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    const newId =
        posts.length > 0
            ? Math.max(...posts.map(p => p.id)) + 1
            : 1;

    const newPost = {
        id: newId,
        title,
        content,
        category: category || "general"
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});

// UPDATE part of a post
router.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const targetPost = posts.find(p => p.id === id);

    if (!targetPost) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    if (req.body.title !== undefined) {
        targetPost.title = req.body.title;
    }

    if (req.body.content !== undefined) {
        targetPost.content = req.body.content;
    }

    if (req.body.category !== undefined) {
        targetPost.category = req.body.category;
    }

    res.json({
        success: true,
        updatedPost: targetPost
    });
});

// DELETE a post
router.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    const deletedPost = posts.splice(postIndex, 1)[0];

    res.json({
        success: true,
        deleted: deletedPost
    });
});

export default router;