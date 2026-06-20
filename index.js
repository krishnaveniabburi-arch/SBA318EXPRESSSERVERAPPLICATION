import express  from "express";
import path from "path";
import { fileURLToPath } from "url";
import{ requestLogger, apiHeaderSetter,ErrorHandler} from "./middleware.js";

// import data from folders
import postsRouter from "./routes/posts.js";
import comments from "./routes/comments.js";
import users from "./data/users.js";

//import data from root folder

import posts from "./data/posts.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// activating middlewares

app.use(requestLogger);
app.use(apiHeaderSetter);

app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("api/users", users);

app.get("/", (req, res) => {
    res.render("index", { currentPosts: posts });
});



// error middeelware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
})