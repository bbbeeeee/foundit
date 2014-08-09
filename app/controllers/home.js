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
    var foundList = Found.find({}, function(err, foundList){
      console.log(foundList);
      res.render('found_list', {
        foundlist: foundList
      })
    });
    
  });

  app.route('/found/:id')
  .get(function(req, res, next){
    var _found = Found.findOne({_id: req.params.id}, function(err, doc){
      res.render('found_specific', {
        found: _found
      });
    });
  });

  // get id from req.session
  app.route('/i-found-something')
  .post(function(req, res, next){
    if(req.user){
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
    } else {
      res.redirect('/login');
    }
  })
  .get(function(req, res, next){

    res.render('found_form', {

    });
  })
};
