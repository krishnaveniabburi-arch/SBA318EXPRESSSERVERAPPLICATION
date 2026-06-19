comments.js
import express from "express";
const router = express.router();
const comments = [
     { id: 1, username: "user1", body: "first comment" },
     {id: 2, username: "user2", body: "Thankyou for sharing."}
];


router.get("/", (req, res) => {
    res.json(comments);
});
export default router;