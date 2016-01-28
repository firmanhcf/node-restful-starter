module.exports = function(app, controller){

	//# Route list
	app.get('/', function(req, res) {
        res.redirect('http://getmaleo.com/not-found');
    });

    //# User Route
    var user = '/user/';
    app.post(user + 'register', controller.user.register);
    app.post(user + 'login', controller.user.login);
    app.post(user + 'logout', controller.user.logout);
}