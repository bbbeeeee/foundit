var express = require('express');
var fs = require('fs');
var path = require('path');

var favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongostore')(session),
    mongoose = require('mongoose'),
    passport = require('passport');


module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser()); 
  app.use(session({
    store: new MongoStore({ 
      'db': 'wilu-dev', 
      'collection': 'sessions',
      'ttl': 60*60*60,
      'mongooseConnection': mongoose.connections[0]
  }),
  resave: true,
  saveUninitialized: true,
  url: config.db,
  secret: 'secret',
  collection: 'sessions',
  cookie: { maxAge: 60*60*60 }
}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(function (req, res, next) {
    res.locals.loggedin = (!!req.user);
    next();
  });
  var controllersPath = path.join(__dirname, '../app/controllers');
  fs.readdirSync(controllersPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
      require(controllersPath + '/' + file)(app);
    }
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  app.route('*')
  .get(function(req, res){
    res.send('lol');
  })
};
