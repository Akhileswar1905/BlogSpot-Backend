const express = require("express");
const blogRouter = express.Router();
const mongoose = require("mongoose");
const userRouter = require("./userRouter");

// BlogSchema
const BlogSchema = new mongoose.Schema(
  {
    blogTitle: { type: String, required: true, unique: true },
    blogContent: { type: String, required: true },
    blogTags: { type: Array, required: false },
    blogImg: { type: String, required: false },
    username: { type: String, required: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// Blog Model
const Blog = mongoose.model("Blog", BlogSchema);

// Create a new blog
blogRouter.post("/blogs", async (req, res) => {
  const doc = await Blog.create(req.body);
  res.json(doc);
  console.log(doc);
});

// Get my blogs
blogRouter.post("/blogs/my-blogs", async (req, res) => {
  const token = req.body.userId;
  const docs = await Blog.find({ userId: token });
  console.log(req.body.userId);
  res.json(docs);
});

// Get all blogs
blogRouter.get("/blogs", async (req, res) => {
  const username = req.query.user;
  const cat = req.query.cat;
  let posts;
  if (username) {
    posts = await Blog.find({ username: username });
    res.json(posts);
    console.log(username);
  } else if (cat) {
    posts = await Blog.find({ blogTags: { $in: [cat] } });
    res.json(posts);
    console.log(cat);
  } else {
    posts = await Blog.find({});
    console.log(req.query);
    res.json(posts);
  }
});

// Get a particular blog
blogRouter.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// Delete a blog
blogRouter.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.send("Blog deleted");
});

// Update a blog
blogRouter.put("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (req.body.username === blog.username) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedBlog);
    } catch (error) {
      res.json(error);
    }
  }
});

module.exports = blogRouter;
