module.exports = function(mongoose){
	var Schema = mongoose.Schema;

	var user = new Schema({
	  name			: { type: String, default: ""},
	  username 		: { type: String, required: true, unique: true },
	  email			: { type: String, required: true, unique: true },
	  password		: { type: String, required: true },
	  photo 		: { type: String, default: ""},
	  status		: { type: Number, default: -1},
	  created_at	: { type: Date, default: Date.now },
	  updated_at	: { type: Date, default: Date.now }
	}, { versionKey: false });

	return mongoose.model('user', user);

}