var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User');


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
      if(!user){
        var newuser = {}

        newuser.fullname = req.body.fullname;
        newuser.email = req.body.email;
        newuser.password = req.body.password;

        var newUser = new User(newuser);

        newUser.save(function(err){
          if(err){
            console.log(err);
            res.redirect('/login');
          } else {
            res.redirect('/');
          }
        });
      }
    })
  })
};
