const express = require('express');
const router = express.Router();

// @route Post api/user
// @access_level public
// @description Register User

router.post('/', (req,res)=> {
    console.log(req.body);
    res.send('User Route!')
});

module.exports = router;