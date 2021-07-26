const express = require('express')
const router = express.Router()

// @route GET api/user
// @authorization fals
// @access_level public
// @description Return the current user

router.get('/',(req,res)=>{
    res.send('User Route!')
})

module.exports = router