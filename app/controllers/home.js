var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User'),
  Found = mongoose.model('Found'),
  Response = mongoose.model('Response'),
  sendgrid = require('../util/sendgrid.js'),
  Lost = mongoose.model('Lost'),
  nlp = require('../util/nlp.js');

module.exports = function (app) {

  app.route('/')
  .get(function (req, res, next) {
    res.render('index', {
      
    });
  });

  app.route('/found')
  .get(function(req, res, next){
    if(req.user){
      var foundList = Found.find({}, function(err, foundList){
        res.render('found_list', {
          foundlist: foundList
        })
      });
      
    }
  });

  app.route('/lost')
  .get(function(req, res, next){
    if(req.user){
      var lostList = Lost.find({}, function(err, lostList){
        res.render('lost_list', {
          lostlist: lostList
        })
      });
      
    }
  });

  app.route('/found/:id')
  .get(function(req, res, next){
    if(req.user){
      Found.findOne({_id: req.params.id}, function(err, _found){
        if(!_found) res.redirect('/found');
        else{
          Response.find({foundId: _found._id}, function(err, _responses){
            var _ownsThis = (_found.userId.equals(req.user._id));
            res.render('found_specific', {
              found: _found,
              responses: _responses,
              ownsThis: _ownsThis
            });
          });
        }
      });
    } else res.redirect('/login');
  });

  app.route('/this-is-mine')
  .post(function(req, res, next){
    if(req.user){
      var newResponse = new Response({
        userId: req.user._id,
        foundId: req.body.id,
        description: req.body.description,
        email: req.body.email
      });

      newResponse.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.redirect('/found');
        }
      });

    }
  });

  // get id from req.session
  app.route('/i-found-something')
  .post(function(req, res, next){
    if(req.user){
      console.log(req.user._id);
      var newFound = new Found({
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description
      });

      // NLP check distance so we can estimate whether or not to send it 
      // to you
      Found.find({}, function(err, founds){
        founds.forEach(function(found, index){
          if(nlp.isSimilar(req.body.description, found.description)){
            sendgrid.sendWeThink()
          }
        })
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
  });

  // lost submission
  app.route('/i-lost-something')
  .post(function(req, res, next){
    if(req.user){
      var newLost = new Lost({
        userId: req.session.userId,
        title: req.body.title,
        description: req.body.description
      });

      newLost.save(function(err){
        if(err){
          console.log(err);
        } else {
          res.redirect('/')
        }
      });
    } else {
      res.redirect('/login');
    }
  })
  .get(function(req, res, next){
    if(req.user){
      res.render('lost_form', {

      });
    }
  });

  app.route('/this-is-it')
  .post(function(req, res, next){
    console.log(req.body);
    User.findOne({_id: req.user._id}, function(err, user){
      console.log(err);
      console.log(user);
      sendgrid.sendLost(req.body.email,
        req.body.description, 
        req.body.title,
        user);
      res.redirect('/found');
    });
  });
};
