module.exports = function(app){
	
	app.all('*')
	.get(function(req, res){
		res.send('hell yeah');
	});

}