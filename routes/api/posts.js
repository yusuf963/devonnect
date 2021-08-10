const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/post
// @authorization fals
// @access_level public
// @description post user register form
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await user.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.body.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.console.error(err.massage);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
