module.exports = function(app,fs,path,_,mongoose){
	
	var crypto 	 = require('crypto');

	exports.encrypt = function(text){
		encoding = "base64";
	    algorithm = "sha256";
	    return crypto.createHmac(algorithm, app.config.application.NAME).update(text).digest(encoding);
	}

	return exports;

}