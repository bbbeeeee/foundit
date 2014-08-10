var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LostSchema = new Schema({
	userId: Schema.Types.ObjectId,
	title: String,
	description: String
});

// List will return all with FoundSchema id as foundId
var LostResponsesSchema = new Schema({
  userId: Schema.Types.ObjectId,
  lostId: Schema.Types.ObjectId,
  description: String,
  email: String
});

mongoose.model('Lost', LostSchema);
mongoose.model('LostResponse', LostResponsesSchema);
