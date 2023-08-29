// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose')
const { Schema } = mongoose;

const optionsSchema = new Schema({
	pet: String,
	description: String,
	services: String,
	rating: { type: Number, default: 0 },
	ratingNumber: { type: Number, default: 0 },
	image: String,
	userId: { type: Schema.Types.ObjectId, ref: 'user' }
})


//crée un modèle appelé UserModel en se basant sur le schéma userSchema
const optionsModel = mongoose.model('options', optionsSchema)

// on export pour l'utiliser dans le controller
module.exports = optionsModel;