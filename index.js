import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import {
  requestLogger,
  apiHeaderSetter,
  errorHandler
} from "./middleware.js";

import apiRouter from "./routes/api.js";
import posts from "./data/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger);
app.use(apiHeaderSetter);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.render("index", {
    currentPosts: posts
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});