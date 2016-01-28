module.exports = function(app,mongoose){

	var jwt		 = require('jsonwebtoken');
	var user 	 = app.models.user;

	exports.register = function(req, res){
		var newUser = new user({
			username : req.body.username,
			email : req.body.email,
			password : app.helpers.string.encrypt(req.body.password)
		});

		newUser.save(function(err){
			if(err){
				app.helpers.response.failed(res, err);
			}

			newUser = newUser.toObject();
			delete newUser.created_at;
			delete newUser.updated_at;
			delete newUser.password;
			app.helpers.mail.send("no-reply@appname.com", newUser.email, "", "Please Confirm Your Account", "reg_confirmation", {});
			app.helpers.response.success(res, 1001, newUser);
		});
		
	};

	exports.login = function(req, res){
		user.findOne({ username : req.body.username, password : app.helpers.string.encrypt(req.body.password) },
   		'-password -created_at -updated_at' ,function(err, r){
   			if(err){
				app.helpers.response.failed(res, err);
			}

			r = r.toObject();
			r.token = jwt.sign({_id : r.id, email : r.email}, app.config.application.JWT_KEY);
			app.helpers.response.success(res, 1002, r);
   		});
	};

	exports.logout = function(req, res){
		res.send('logout route');
	};

	return exports;
}