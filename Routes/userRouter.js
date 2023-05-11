const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");

// UserSchema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    categories: { type: Array, required: false },
    profileDescription: { type: String, required: false },
    socialMediaLinks: { type: Array, required: false },
    bookmarks: { type: Array, required: false },
  },
  { timestamps: true }
);

// User Model
const User = mongoose.model("User", UserSchema);

// Register
userRouter.post("/users/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updating User

userRouter.put("/users/:id", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.json(user);
    console.log(user);
  } catch (error) {
    res.json(error);
  }
});

// Delete user

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send("User is deleted");
  } catch (error) {
    res.send("Error Occured");
  }
});

// get a particular user

userRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// Get all users
userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    console.log(req.body);
  } catch (error) {
    // console.log(error.message());
    res.send(error);
  }
});

module.exports = userRouter;
