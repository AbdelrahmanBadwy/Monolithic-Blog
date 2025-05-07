const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Abdelrahman El Badawy",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const error = new Error("Validation failed, entered data is incorrect.");
    // error.statusCode = 422;
    // throw error;
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/duck.jpg",
    creator: { name: "Abdelrahman El Badawy" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Creating a post failed!",
        error: err,
      });
    });  
    //=============================================
  // // Create post in db
  // res.status(201).json({
  //   message: "Post created successfully!",
  //   post: {
  //     _id: new Date().toISOString(),
  //     title: title,
  //     content: content,
  //     creator: { name: "Abdelrahman El Badawy" },
  //     createdAt: new Date(),
  //   },
  // });
};
