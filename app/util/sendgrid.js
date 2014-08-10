var sendgrid  = require('sendgrid')('john_doe', 'hi');


module.exports = {
	sendFound: function(email, message, itemTitle, user){
			var message = "Hey, I'm " +
				user.fullname + ", " +
				"and I found your " + 
				item.title + ".\n\n" + 
				"Here's a description of the item:\n\n" +
				message + "\n\n" +
				"Does it match the item you found?\n\n";

			var messageToPerson = {
		    to: email,
		    from: 'bobbinladen1234@gmail.com',
		    subject: 'Hey, I found your ' + item.title,
		    text: message
			};
			sendgrid.send(messageToPerson, function(err, json) {
			    if (err) { return console.error(err); }
			    console.log(json);
			});
		},
		sendLost: function(email, message, itemTitle, user){
			var message = "Hey, I'm " +
				user.fullname + ", " +
				"and I lost my " + 
				itemTitle + ".\n\n" + 
				"I saw that you found a similar item. " +
				"Here's a description of my item:\n\n" +
				message + "\n\n" +
				"Does it match the item you found?\n\n" +
				"If so, email me back!";
				
			var messageToPerson = {
		    to: email,
		    from: 'bobbinladen1234@gmail.com',
		    subject: 'Hey, I found your ' + itemTitle,
		    text: message
			};
			sendgrid.send(messageToPerson, function(err, json) {
			    if (err) { return console.error(err); }
			    console.log(json);
			});
		},
		sendWeThink: function(email, message, itemTitle, id){
			var message = "Hey, this is FoundIt!\n\n" +
			"We think we found someone with your '" + itemTitle + "'\n\n" +
			"If the description below matches your item, go to the link below and accept it!\n\n" +
			"Description: \n" + message + "\n\n" +
			"Link: " + "http://localhost/found/" + id;

			var messageToPerson = {
				to: email,
		    from: 'bobbinladen1234@gmail.com',
		    subject: 'Hey, we think someone found your ' + itemTitle,
		    text: message
			}

			sendgrid.send(messageToPerson, function(err, json){
				if (err) { return console.error(err); }
			  console.log(json);
			});
		}
}
