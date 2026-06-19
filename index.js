import express  from "express";
import path from "path";
import { fileURLToPath } from "url";
import{ requestLogger, apiHeaderSetter,ErrorHandler} from "./middleware.js";

// import routers from subfolders
import postrouter from "./routes/posts.js";
import commentsrouter from "./routes/comments.js";

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
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.get("/", (req, res) => {
    res.render("index", { currentPosts: posts });
});



// error middeelware
app.use(ErrorHandler);


app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
})