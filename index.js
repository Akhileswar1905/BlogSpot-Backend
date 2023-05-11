const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const blogRouter = require("./Routes/blogRouter");
const userRouter = require("./Routes/userRouter");

require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  console.log("Database connection established");
}

const server = express();

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));
server.use(blogRouter);
server.use(userRouter);

const port = process.env.PORT || 3001;

// Listen on port
server.listen(port, async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Server listening on ${port}`);
});
