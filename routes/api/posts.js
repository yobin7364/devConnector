const express = require("express");
const router = express.Router();

//this points to /api/users/test or any route ending with /test
//@route  GET /api/posts/test
//@desc   Tests post route
//@access Public
router.get('/test', (req,res) => res.json({msg: "Posts Works"}));

module.exports = router;
