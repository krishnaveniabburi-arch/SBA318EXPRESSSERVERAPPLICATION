import express from "express";
import { users, posts, comments } from ("../data.js");
const router = express.Router();


// GET all posts with query string 
router.get("/Posts", (req, res) => {
    const { category } = req.query;
    if (category) {
        const filtered = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
    }
    res.json(posts);
})

router.get("/users", (req, res) => res.json(users));
router.get("/comments", (req, res) => res.json(comments));

// GET single item using parameters

router.get("/posts/:id", (req, res) => {
    const targetPost = posts.find(p => p.id === parseInt(req.params.id));
    if (!targetPost) return res.status(404).json({eror:"post item not found"});
    res.json(targetPost);
});

// POST to appen elements

router.post("/posts", (req, res) => {
    const {title, content, category} = req.body;
    if (!title || !content) {
        return res.status(400).json({error: "Title and content properties required"});

    }
    const newEntry = {
        id: posts.length +1,
        title,
        content,
        category: category || "general"
    };

    posts.push(newEntry);
    res.redirect("/"); // back to front end page
});

// PATCH to modify target properties

router.patch("/posts/:id", (req, res) => {
    const targetPost = posts.find(p => p.id === parseInt(req.params.id));
    if (!targetPost) return res.status(404).json({ error: "post resource not found"});
    if (req.body.title) targetPost.title = req.body.title;
    if (req.body.content) targetPost.content = req.body.content;

    res.json({success:true, updatedPost: targetPost});
});

// DELETE endpoint to delete specific entries

router.delete("/posts/:id", (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ error: "post target missing"});
    const removedItem = posts.splice(postIndex, 1);
    res.json({ sucess:true, deleted:removedItem});
});

module.exports = router;
