import express  from "express";
import path from  "path"
import { fileURLToPath } from "url";
import{ requestLogger, apiHeaderSetter,ErrorHandler} from "./middleware.js";
import apiRouter from  "./routes.js";
import posts from "./data.js";


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

app.get("/", (req, res) => {
    res.render("index", { currentPosts: posts });
});

app.use("/api", apiRouter);

// error middeelware
app.use(ErrorHandler);


app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
})