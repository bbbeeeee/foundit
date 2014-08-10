var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(null, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err) {
        console.log(err);
      } else if(!user){
        return done(null, false, 'Incorrect email.');
      } else {
        return done(null, user);
      }
    });
}));

module.exports = function (app) {

  app.route('/login')
  .get(function(req, res){
    res.render('login')
  })
  .post(passport.authenticate('local', { successRedirect: '/',
                                         failureRedirect: '/login' }));

  app.route('/signup')
  .post(function(req, res){
    User.findOne({
      email: req.body.email
    }, function(err, user){
      console.log('user: ' + user);
      if(!user){
        console.log(req.body);
        console.log(req);

        var newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password
        });

        newUser.save(function(err){
          if(err){
            console.log(err);
            res.redirect('/login');
          } else {
            res.redirect('/');
          }
        });
      } else {
        res.send('lol');
      }
    })
  });

  app.route('/logout')
  .get(function(req, res){
    if(req.user){
      req.logout();
    }
    
    res.redirect('/');
  });
};
