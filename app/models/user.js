var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
	fullname: String,
	password: String,
	email: {
		type: String,
		required: true
	}
});

mongoose.model('User', UserSchema);