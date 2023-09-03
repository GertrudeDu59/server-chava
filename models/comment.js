// un schéma est une structure qui définit la forme des documents 
//que je vais stocker dans une collection de base de données MongoDB. 
//En d'autres termes, il spécifie les propriétés

const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentsSchema = new Schema({
    // un tableau car plusieurs commentaire associé à un seul user
	comments : [
        {
            // Le texte du commentaire
            text : String,
            //Date de creation qui a pour type une date et une valeur par default de date.now
            created: {type: Date, default: Date.now},
            //Associe un commentaire à un user
            postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"user"}
        }
    ]
})


//crée un modèle appelé UserModel en se basant sur le schéma userSchema
const commentModel = mongoose.model('comments', commentsSchema)

// on export pour l'utiliser dans le controller
module.exports = commentModel;