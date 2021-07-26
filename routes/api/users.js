const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User')

// @route Post api/user
// @access_level public
// @description Register User

router.post(
    '/',
    // valoidate the user registeration input on the server side
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valide Email').isEmail(),
        check('password', 'Please include a valid Password').isLength({min: 6})
    ],
     (req,res)=> {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()});
        }else if(error.isEmpty()){
            return res.status(200).json({message: 'User created successfully'});
        }
        // create a new user
    const {name, email, password} = req.body;
    console.log(req.body);
    res.send('User Route!')
});

module.exports = router;