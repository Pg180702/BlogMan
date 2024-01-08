const express = require("express");
const postRoute = require("../controllers/post.controller");
const upload = require("../middlewares/multer");
const router = express.Router();

router
  .route("/create")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), postRoute.createPost);

router.route("/allposts").get(postRoute.allPosts);
router.route("/mainpost/:id").get(postRoute.mainPost);
router.route("/editpost/:id").get(postRoute.editPost);
router
  .route("/updatePost")
  .put(upload.fields([{ name: "image", maxCount: 1 }]), postRoute.updatePost);

module.exports = router;
