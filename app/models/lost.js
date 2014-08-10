var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LostSchema = new Schema({
	userId: Schema.Types.ObjectId,
	title: String,
	description: String
});

mongoose.model('Lost', LostSchema);