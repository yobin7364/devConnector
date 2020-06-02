const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load post model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//validate post
const validatePostInput = require('../../validation/post');

//this points to /api/users/test or any route ending with /test
//@route  GET /api/posts/test
//@desc   Tests post route
//@access Public
router.get('/test', (req,res) => res.json({msg: "Posts Works"}));


//@route  GET /api/posts
//@desc   Get all posts
//@access Public
router.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopost: "There are no post for this user"}));
});


//@route  GET /api/posts/:id
//@desc   Get post by id
//@access Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));
});



//@route  POST /api/posts
//@desc   Create post 
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {

    const errors = validatePostInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    //when creating a new collection
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });


    newPost.save().then(post => res.json(post));

});


//@route  DELETE /api/posts/:id
//@desc   Delete post by id
//@access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Post.findById(req.params.id)
        .then(post => {
            //check for post owner
            if (post.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: "User not authorized"});
            }

            //delete
            post.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));
});


//@route  POST /api/posts/like/:id
//@desc   Like post by post id
//@access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Post.findById(req.params.id)
        .then(post => {
            //check if the user id exist already in 'likes'
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({alreadyliked: "User already liked this post"});
            }

            //Add user id to likes array
            post.likes.unshift({user: req.user.id});

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));
});


//@route  POST /api/posts/unlike/:id
//@desc   Unlike post by post id
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Post.findById(req.params.id)
        .then(post => {
            //check if the user id exist already in 'likes'
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notliked: "You have not liked this post"});
            }

            //Add user id to likes array
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

            //remove
            post.likes.splice(removeIndex,1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));
});


//@route  POST /api/posts/comment/:id
//@desc   Add comment to post by post id
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

    const errors = validatePostInput(req.body);

    //check validation
    if(!errors.isValid){
        return res.status(400).json(errors);
    };

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            //Add to comment array
            post.comments.unshift(newComment);

            //save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));

});


//@route  DELETE /api/posts/comment/:id/comment_id
//@desc   Remove comment of post by post id and comment id
//@access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res) => {

    Post.findById(req.params.id)
        .then(post => {
            //check if given comment id exists 
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(400).json({commentnotexist: "Comment doesnot exist"});
            }

            //get remove index
            const removeIndex = post.comments
                                    .map(comment => comment._id.toString())
                                    .indexOf(req.params.comment_id);

            //REMOVE
            post.comments.splice(removeIndex,1);

            //save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({nopost: 'There are no post for this user'}));

});


module.exports = router;
