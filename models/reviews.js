// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewsSchema = new Schema({
            //Le commentaire
            content : String,
            //La note 
            rating: Number,
            //Date de creation qui a pour type une date et une valeur par default de date.now
            createdAt: {type: Date, default: Date.now},
            //Stockera l'ID de l'utilisateur qui a ecris le commentaire
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
            // Stockera l'ID de l'utilisateur qui a reçu le commentaire
            profilId: {type: mongoose.Schema.Types.ObjectId, ref: 'profile'},
})

//crée un modèle appelé reviewModel en se basant sur le schéma reviewsSchema
const ReviewsModel = mongoose.model('reviews', reviewsSchema)

// on export pour l'utiliser dans le controller
module.exports = ReviewsModel;