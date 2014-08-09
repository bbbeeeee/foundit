var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {

  app.route('/')
  .get(function (req, res, next) {

    Article.find(function (err, articles) {
      if (err) return next(err);
      res.render('index', {
        title: 'Generator-Express MVC',
        articles: articles
      });
    });

  });

  app.route('/found')
  .get(function(req, res, next){
    
  });

  app.route('/found/:id')
  .get(function(req, res, next){

  });

  app.route('/lost')
  .get(function(req, res, next){

  });

  app.route('/lost/:id')
  .get(function(req, res, next){

  });
};


