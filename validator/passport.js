const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET';




const strategy = new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    User.findOne({ where: { id: jwt_payload.id } })
        .then((user) =>{
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        })
        .catch((err) =>{
            return done(err, false);
        })
});


module.exports = (passport) => {
    passport.use(strategy)
}