const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};

//extract JWT from request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
        
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            //jwt_payload contains extracted users data from jwt
            User.findById(jwt_payload.id)
                .then(user => {
                    if (!user) {
                    return done(null,false);
                    }
                    //user is passed to next func after authorization 
                    return done(null,user);
                })
                .catch(err => console.log(err));
        })
    );
};