const express = require('express');
const router = express.Router();

// @route GET api/user
// @authorization fals
// @access_level public
// @description Return the current user
router.get('/auth',(req, res)=>{
    res.send('Auth Route!')
})
module.exports = router;