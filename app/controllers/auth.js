var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport');

module.exports = function (app) {

  app.route('/login')
  .post(passport.authenticate('local', { successRedirect: '/',
                                         failureRedirect: '/login' }));
  
};
