var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FoundSchema = new Schema({
	userId: Schema.Types.ObjectId,
	password: String,
	email: String
});

mongoose.model('Found', FoundSchema);