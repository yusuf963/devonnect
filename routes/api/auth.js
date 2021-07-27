const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');

// @route GET api/auth
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


//@route POST api/auth
router.post(
    '/',
        check('email', 'please provide email').isEmail(),
        check('password', 'please provide password').exists(),
        async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({errors: [{msg: 'Invalid Credintails'}]});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({errors: [{msg: 'Invalid Credintails'}]});
            }
            const payload ={
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                // {expiresIn: 3600000},
                (err, token)=>{
                    if(err) throw err;
                    res.json({token});
                }
            )
        }catch(e){
            res.status(500).send('server error');
        }

})
module.exports = router;

// router.get('/', auth, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });
  
//   // @route    POST api/auth
//   // @desc     Authenticate user & get token
//   // @access   Public
//   router.post(
//     '/',
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { email, password } = req.body;
  
//       try {
//         let user = await User.findOne({ email });
  
//         if (!user) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid Credentials' }] });
//         }
  
//         const isMatch = await bcrypt.compare(password, user.password);
  
//         if (!isMatch) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid Credentials' }] });
//         }
  
//         const payload = {
//           user: {
//             id: user.id
//           }
//         };
  
//         jwt.sign(
//           payload,
//           config.get('jwtSecret'),
//           { expiresIn: '5 days' },
//           (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//           }
//         );
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//       }
//     }
//   );
  
//   module.exports = router;