const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/userProfile/:id", postsController.getUserProfile);
router.get("/createPost", ensureAuth, postsController.getCreate);
router.get("/editProfile", ensureAuth, postsController.getProfileEditor);
router.put('/updateBio/:id', postsController.updateBio)
router.put('/updateTags/:id', postsController.updateTags)
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/search", ensureAuth, homeController.getSearch);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;