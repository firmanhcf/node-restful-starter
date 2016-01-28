module.exports = function(app,fs,path,_,mongoose){
	
	var mandrill = require('node-mandrill')(app.config.application.MANDRILL);

	exports.send = function(from, to, receiverName, subject, emailTemplate, data){

		var templatePath 	= fs.readFileSync('./app/view/emails/'+emailTemplate+'.html', encoding="utf8");
    	var html 			=  _.template(templatePath);
		var fixedMail	 	= html(data);

		mandrill('/messages/send', {
		    message: {
		        to: [{email: to, name: receiverName}],
		        from_email: from,
		        from_name : app.config.application.NAME,
		        subject: subject,
		        html:fixedMail
		    }
		}, 
		function(error, response){
			console.log(error+" : "+response);
		});
		
	}

	return exports;

}