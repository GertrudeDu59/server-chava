// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose')
const { Schema } = mongoose;

const profileSchema = new Schema({
	description: String,
	image: String,
	rating: Number,
	isPetSitter : { type: Boolean, default: false },
	ratingNumber: Number,
	image: String,
		pet_owner: {
			owner_Chat: { type: Boolean, default: false },
			owner_Chien: { type: Boolean, default: false },
			owner_Lapin: { type: Boolean, default: false },
			owner_Hamster: { type: Boolean, default: false },
		},
		pet_offer: {
			offer_Chat: { type: Boolean, default: false },
			offer_Chien: { type: Boolean, default: false },
			offer_Lapin: { type: Boolean, default: false },
			offer_Hamster: { type: Boolean, default: false },
		},
		services: {
			keep: { type: Boolean, default: false },
			lodging: { type: Boolean, default: false },
			walking: { type: Boolean, default: false },
			visit: { type: Boolean, default: false },
		},
	user_id: { type: Schema.Types.ObjectId, ref: 'user' }
});
//crée un modèle appelé UserModel en se basant sur le schéma userSchema
const profileModel = mongoose.model('profile', profileSchema)

// on export pour l'utiliser dans le controller
module.exports = profileModel;