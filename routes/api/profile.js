const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateRegisterInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//load profile model
const Profile = require('../../models/Profile');
//load User Profile
const User = require('../../models/User');

//this points to /api/users/test or any route ending with /test
//@route  GET /api/profile/test
//@desc   Tests post route
//@access Public
router.get('/test', (req,res) => res.json({msg: "Profile Works"}));


//@route  GET /api/profile
//@desc   Get current users profile
//@access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id})
    //adds documents of referenced collection
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile) {
                    errors.noprofile = "There is no profile for this user";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
});


//@route  GET /api/profile/handle/:handle
//@desc   Get profile by handle
//@access Public
router.get('/handle/:handle', (req,res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
            //this 'user' refers to 'user' in profile modal
            .populate('user', ['name','avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'There is no profile for this user';
                    res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));

});


//@route  GET /api/profile/user/:user_id
//@desc   Get profile by user ID
//@access Public
router.get('/user/:user_id', (req,res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
            //this 'user' refers to 'user' in profile modal
            .populate('user', ['name','avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'There is no profile for this user';
                    res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));

});


//@route  GET /api/profile/all
//@desc   Get all profiles
//@access Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name','avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = 'There is no profiles';
            res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'There is no profiles'}));
});




//@route  POST /api/profile
//@desc   Create users profile
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {

    const errors = validateRegisterInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    //get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //skills, split into array as input is given as comma separated string
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(",");
    };

    //social data is an object with collection of objects so we need to initalize it to avoid undefined error
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id})
            .then(profile => {
                //if profile is found then update the profile
                if(profile){
                    
                    Profile.findOneAndUpdate(
                        {user: req.user.id},
                        { $set: profileFields},
                        {new: true}
                    ).then(profile => res.json(profile));
                }

                else{
                    //if no profile is found then check the handle first if exists or not then create a new profile
                    Profile.findOne({handle: profileFields.handle})
                            .then(profile => {
                                if(profile){
                                    errors.handle = "That handle already exists";
                                    res.status(400).json(errors);
                                }

                                //save profile
                                new Profile(profileFields).save().then(profile => res.json(profile));
                            });
                }
            });
});




//@route  POST /api/profile/experience
//@desc   Add experience to profile
//@access Private
router.post('/experience', passport.authenticate('jwt', {session:false}), (req,res) => {
    
    const errors = validateExperienceInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    Profile.findOne({user: req.user.id})
            .then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                //add to experience array
                profile.experience.unshift(newExp);

                profile.save().then(profile => res.json(profile));
            })
});


//@route  POST /api/profile/education
//@desc   Add education to profile
//@access Private
router.post('/education', passport.authenticate('jwt', {session:false}), (req,res) => {
    
    const errors = validateEducationInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    Profile.findOne({user: req.user.id})
            .then(profile => {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                //add to experience array
                profile.education.unshift(newEdu);

                profile.save().then(profile => res.json(profile));
            })
});


//@route  DELETE /api/profile/experience/:exp_id
//@desc   Delete experience from profile
//@access Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req,res) => {
    
    Profile.findOne({user: req.user.id})
            .then(profile => {
                //get remove index
                const removeIndex = profile.experience
                                            .map(item => item.id)
                                            .indexOf(req.params.exp_id);

                //remove array
                profile.experience.splice(removeIndex, 1);

                //save
                profile.save().then(profile => res.json(profile));

            })
            .catch(err => res.status(404).json(err));
});

//@route  Update /api/profile/experience/:exp_id
//@desc   Update experience from profile
//@access Private
router.put('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req,res) => {

    const experienceField = {};

    if(req.body.title) experienceField.title = req.body.title;
    if(req.body.company) experienceField.company = req.body.company;
    if(req.body.location) experienceField.location = req.body.location;
    if(req.body.from) experienceField.from = req.body.from;
    req.body.to ? (experienceField.to = req.body.to) : (experienceField.to = '');
    if(req.body.description) experienceField.description = req.body.description;
    if(req.body.current) experienceField.current = req.body.current;

    Profile.findOne({user: req.user.id})
            .then(profile => 
                {
                    profile.experience.map((item) => {
                    if (item.id === req.params.exp_id){
                        //spread operator causes problem for 'item' object 
                        item = Object.assign(item, experienceField);
                    }
                })
                profile.save().then(profile => res.json(profile));
                }

                ).catch(err => res.status(404).json(err));

});


//@route  DELETE /api/profile/education/:edu_id
//@desc   Delete education from profile
//@access Private

router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req,res) => {
    
    Profile.findOne({user: req.user.id})
            .then(profile => {
                //get remove index
                const removeIndex = profile.education
                                            .map(item => item.id)
                                            .indexOf(req.params.edu_id);

                //remove array
                profile.education.splice(removeIndex, 1);

                //save
                profile.save().then(profile => res.json(profile));

            })
            .catch(err => res.status(404).json(err));
});


//@route  DELETE /api/profile
//@desc   Delete user and profile
//@access Private

router.delete('/', passport.authenticate('jwt', {session:false}), (req,res) => {
    
    Profile.findOneAndRemove({user: req.user.id}).then(() => {
            User.findOneAndRemove({_id: req.user.id}).then(() => 
            res.json({ success: true}))
    });
});


module.exports = router;
