const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User')
const config = require('config');          

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
    async (req,res)=> {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()});
        }
        // create a new user
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({error: 'User already exists'});
        }
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
        user = new User({
            name,
            email,
            avatar,
            password,
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const paylaod = {
            user:{
                id: user.id
            }
        }
        jwt.sign(
            paylaod, 
            config.get('jwtSecret'),
            // {expiresIn: '1h'},
            (err, token)=>{
                if(err) throw err;
                res.json({token})
            });

    }catch(err){
        console.log(err);
        return res.status(500).send('server error');
    }
     console.log(req.body);
});

module.exports = router;