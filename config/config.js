var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'foundit'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/foundit-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'foundit'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/foundit-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'foundit'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'yolo'
    
  }
};

module.exports = config[env];
