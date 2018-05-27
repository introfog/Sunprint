const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const user = {
    "username": 'Example',
    "password": '1'
}

let cryptUsers = [];
const users = [
  {
    "username": "tiki",
    "password": "pass1"
  },
  {
    "username": "introfog",
    "password": "passIntro"
  },
  {
    "username": "Dimas",
    "password": "pass2"
  }
];


for (let i = 0; i < users.length; i++) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(users[i]['password'], salt, function (err, hash) {
            let crypUser = {
                username: users[i]["username"],
                password: hash,
            }
            cryptUsers.push(crypUser);
        })
    })
}


passport.use(
    new LocalStrategy(function (username, password, done) {
        let user = cryptUsers.find(j => j.username === username);
        if (user === undefined) {
            done(null, false);
        }
        if (bcrypt.compareSync(password, user.password)) {
            done(null, user)
        }
        else {
            done(null, false);
        }
    })
);


passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})

module.exports = passport;