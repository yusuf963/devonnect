const express =require('express');
const router= express.Router()

// @route GET api/post
// @authorization fals
// @access_level public
// @description post user register form
router.post('/post', (req, res) =>{
    res.send('Post Route!');
})