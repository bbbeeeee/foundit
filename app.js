var express = require('express'),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  fs = require('fs');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port);

