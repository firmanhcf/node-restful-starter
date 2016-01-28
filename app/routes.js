module.exports = function(app, controller){

	//# Route list
	app.get('/', function(req, res) {
        res.send('This is Node Restful Starter project');
    });

    //# User Route
    var user = '/user/';
    app.post(user + 'register', controller.user.register);
    app.post(user + 'login', controller.user.login);
    app.post(user + 'logout', controller.user.logout);
}