module.exports = function(app,fs,path,_,mongoose){
	
	exports.success = function(res, msgCode, obj){
		res.status(200);
		res.json({
			status : true,
			message : app.config.error_code[msgCode],
			result : obj
		});
	}

	exports.unauthorized = function(res){
		res.status(401);
		res.json({
			status : false,
			message : "You don't have permission to perform this action"
		});
	}

	exports.failed = function(res, msgCode){
		res.status(500);
		res.json({
			status : false,
			message : msgCode
		});
	}

	return exports;

}