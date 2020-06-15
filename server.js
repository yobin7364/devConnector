const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

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

//if non of above routes are called use this if condition
//serve static assests if in production
if(process.env.NODE_ENV === 'production'){
        //set static folder, 'build' folder contains our static assests
        app.use(express.static('client/build'));

        //serve any routes except above API routes to send our index.html file
        app.get('*',(req,res) => {
                res.sendFile(path.resolve(__dirname,'client','build','index.html'));
        });
}

const port  = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));