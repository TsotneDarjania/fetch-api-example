import express from "express";
import { DATABASE_PORT } from "./config";
import cors from "cors";

const app = express();

app.use(cors());

const blogs = [
  {
    id: 1,
    title: "Blog 1",
    content: "This is Blog 1",
  },
  {
    id: 2,
    title: "Blog 2",
    content: "This is Blog 2",
  },
  {
    id: 3,
    title: "Blog 3",
    content: "This is Blog 3",
  },
  {
    id: 4,
    title: "Blog 4",
    content: "This is Blog 4",
  },
  {
    id: 5,
    title: "Blog 5",
    content: "This is Blog 5",
  },
];

app.get("/", (req, res) => {
  res.send("this is Database Server");
});

// Get all blogs
app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

// Get a single blog
app.get("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id));
  if (!blog) {
    res.status(404).send("Blog not found");
  }
  res.json(blog);
});

// Create a new blog
app.post("/api/blogs", (req, res) => {
  const blog = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  blogs.push(blog);
  res.json(blog);
});

// Delete a blog
app.delete("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id));
  if (!blog) {
    res.status(404).send("Blog not found");
    return;
  }
  const index = blogs.indexOf(blog);
  blogs.splice(index, 1);
  res.json(blog);
});

export function startDatabaseServer() {
  app.listen(DATABASE_PORT, () => {
    console.log(`Database server is running on port ${DATABASE_PORT}`);
  });
}
