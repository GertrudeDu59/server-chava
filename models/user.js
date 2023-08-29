// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	fname: String,
	lname: String,
	age: String,
	email: {
		type: String,
		unique: true, // garantit que chaque adresse e-mail dans la collection doit être unique, ce qui permet d'éviter la duplication de données et d'assurer
	},
	tel: Number,
	town: String,
	password: String,
	options: {
		petSitter: { type: Boolean, default: false },
		pet: String,
		description: String,
		services: String,
		rating: { type: Number, default: 0 },
		ratingNumber: { type: Number, default: 0 },
		image: String
	}
})

//crée un modèle appelé UserModel en se basant sur le schéma userSchema
const UserModel = mongoose.model('user', userSchema)

// on export pour l'utiliser dans le controller
module.exports = UserModel;