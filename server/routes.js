module.exports = function(app){
	
	app.get('*', function(req, res){
		res.send('hell yeah');
	});
	
}