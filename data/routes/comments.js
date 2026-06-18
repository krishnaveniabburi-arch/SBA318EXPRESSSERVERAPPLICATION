import users from "../data/users.js";
import comments from "../routes/comments.js";
import posts from "../data/posts.js";

const comments = [{}];
Router.route("/").get((req, res) => {
    res.json(comments);
});
export default Router;