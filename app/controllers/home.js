var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User'),
  Found = mongoose.model('Found');

module.exports = function (app) {

  app.route('/')
  .get(function (req, res, next) {

    Article.find(function (err, articles) {
      if (err) return next(err);
      res.render('index', {
        title: 'FoundIt',
        articles: articles
      });
    });

  });

  app.route('/found')
  .get(function(req, res, next){

    res.render('found_list', {

    })
  });

  app.route('/found/:id')
  .get(function(req, res, next){

    res.render('found_specific', {

    });
  });

  // get id from req.session
  app.route('/i-found-something')
  .post(function(req, res, next){
    var newFound = new Found({
      userId: req.session.userId,
      description: req.body.description
    });

    newFound.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/')
      }
    })
  })
  .get(function(req, res, next){

    res.render('found_form', {

    });
  })
};
