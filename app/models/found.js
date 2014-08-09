var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FoundSchema = new Schema({
	userId: Schema.Types.ObjectId,
	description: String
});

// List will return all with FoundSchema id as foundId
var FoundResponsesSchema = new Schema({
	userId: Schema.Types.ObjectId,
	foundId: Schema.Types.ObjectId,
	description: String,
});

mongoose.model('Found', FoundSchema);