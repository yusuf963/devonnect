const express = require('express');
const router = express.Router();

// @route GET api/profile
// @authorization fals
// @access_level public
// @description Return the profile
router.get('/profile', (req, res) => {
    res.send('Profile Route!')
})



module.exports = router;