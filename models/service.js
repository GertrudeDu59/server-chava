// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    name: String,
    isPetSitter : { type: Boolean, default: false },
    rating: Number,
    ratingNumber: Number,
    animal:{
        Chat : Boolean,
        Chien : Boolean,
        Hamsteur:  Boolean,
        Lapin: Boolean,
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' }
})

//crée un modèle appelé reviewModel en se basant sur le schéma reviewsSchema
const ServiceModeel = mongoose.model('service', serviceSchema)

// on export pour l'utiliser dans le controller
module.exports = ServiceModeel;