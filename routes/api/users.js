const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').secretOrKey;
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//load user model
const User = require('../../models/User');

//this points to /api/users/test or any route ending with /test
//@route  GET /api/users/test
//@desc   Tests post route
//@access Public
router.get('/test', (req,res) => res.json({msg: "User Works"}));

//@route  POST /api/users/register
//@desc   Register user
//@access Public
router.post('/register',(req,res) => {
    const errors = validateRegisterInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    User.findOne({email: req.body.email })
        .then(user => {
            if(user) {
                errors.email = "Email already exists";
                return res.status(400).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                    })
                })
            }
        })
});

//@route  POST /api/users/login
//@desc   Login user
//@access Public
router.post('/login',(req,res) => {
    const errors = validateLoginInput(req.body);

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = "User not found";
                return res.status(400).json(errors);
            }

            //check password
            bcrypt.compare(password,user.password)
                  .then(isMatch => {
                      if(isMatch){
                          //user matched
                          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //JWT token

                          //sign token
                          jwt.sign(payload,
                                    secret,
                                    { expiresIn: 3600},
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            //This is a Bearer token so always keep a space after 'Bearer'
                                            token: 'Bearer ' + token
                                        });
                                    });
                      }
                      else{
                          errors.password = "Password incorrect";
                          return res.status(400).json(errors);
                      }
                  });
        });
});


//@route  GET /api/users/current
//@desc   Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session:false}), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});




module.exports = router;
