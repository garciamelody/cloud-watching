const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require('../models/Profile')
const Comment = require('../models/Comment')
module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      let user = await User.findById({ _id: req.params.id });
      console.log(user.bio)
      res.render("userProfile.ejs", { posts: posts, user: user });
    } catch (err) {
      console.log(err);
    }
  },
  getProfileEditor: async (req, res) => {
    try {
      const profile = await Profile.find({ user: req.user.id });
      const posts = await Post.find({ user: req.user.id });
      res.render("editProfile.ejs", { posts: posts, profile: profile, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreate: async (req, res) => {
    try {
      res.render("createPost.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("feed.ejs", { posts: posts, comments: comments, user:req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const profile = await Profile.findById(req.params.id)
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, profile: profile, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
//   createPost: async (req, res) => {
//     try {
//       await Post.create({
//         title: req.body.title,
//         caption: req.body.caption,
//         likes: 0,
//         user: req.user.id,
//       });
//       console.log("Post has been added!");
//       res.redirect("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   },
  createPost: async (req, res)=>{
    const post = new Post(
        {
            title: req.body.title,
            type: req.body.type,
            caption: req.body.caption,
            likes: 0,
            tags: req.body.tags,
            user: req.user.id,
            createdBy: req.user.userName,
            createdByBio: req.user.bio,
        })
    try{
        await post.save()
        res.redirect('/profile')
    }catch(err){
        console.log(err)
    }
},
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // updateBio: async (req, res) => {
  //   try {
  //     await User.updateOne({bio: String})
  //     res.redirect('/profile');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  updateBio: (req,res) => {
    //pulling the id out of the request and assigning it to a variable 
    const id = req.params.id
    //finds the document by its id and updates it
    User.findByIdAndUpdate(
        id,
        {
          bio: req.body.bio
        },
        err => {
            if (err) return res.status(500).send(err)
            res.redirect('/profile')
        })
  },
  updateTags: (req,res) => {
    //pulling the id out of the request and assigning it to a variable 
    const id = req.params.id
    //finds the document by its id and updates it
    User.findByIdAndUpdate(
        id,
        {
          tags: req.body.tags
        },
        err => {
            if (err) return res.status(500).send(err)
            res.redirect('/search')
        })
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  deleteProfilePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/editProfile");
    } catch (err) {
      res.redirect("/editProfile");
    }
  },
};