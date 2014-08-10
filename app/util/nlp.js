var natural = require('natural');

module.exports = {
	isSimilar = function(firstString, secondString){
		var jw = natural.JaroWinklerDistance(firstString, secondString);

		if(jw > .2){
			return true;
		} else {
			return false;
		}
	}
}