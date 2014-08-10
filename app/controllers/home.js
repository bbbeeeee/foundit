var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User'),
  Found = mongoose.model('Found'),
  Response = mongoose.model('Response');

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
    Found.findOne({_id: req.params.id}, function(err, _found){
      Response.find({foundId: _found._id}, function(err, _responses){
        var _ownsThis = (req.user == _found.userId)
        res.render('found_specific', {
          found: _found,
          responses: _responses,
          ownsThis: _ownsThis
        });
      });
    });
  });

  app.route('/this-is-mine')
  .post(function(req, res, next){
    var newResponse = new Response({
      description: req.body.description,
      email: req.body.description
    });

    newResponse.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/found');
      }
    })
  });

  // get id from req.session
  app.route('/i-found-something')
  .post(function(req, res, next){
    if(req.user){
      var newFound = new Found({
        userId: req.session.userId,
        title: req.body.title,
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
