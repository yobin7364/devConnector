const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        })
        .then(() => console.log('Mongodb connected'))
        .catch(err => console.log(err));

//passport middleware, passport initialization
app.use(passport.initialize());

//passport Config, pass 'passport' as parameter
require('./config/passport')(passport);

//Use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port  = process.env.port || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));