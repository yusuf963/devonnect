const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route GET api/user
// @authorization fals
// @access_level public
// @description Return the current user
router.get('/',auth, async(req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(e){
        res.status(500).send('server error');

    }
})
module.exports = router;