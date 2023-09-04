const Review  = require('../models/reviews');

// Creer un nouvel avis
const createReview = async (req,res) => {
    try {
        const {content, rating, userId, profilId} = req.body; // Je les récupéres dans review
        const newReview = new Review({
            userId , // L'ID de l'utilisateur qui a créé la commentaire
            profilId, // L'ID de l'utilisateur qui à reçu la commentaire
            content, // Message que  l'utilisateur à laissé
            rating, // Note de l'utilisateur à donné
          });
          // Enregistrer la commentaire dans la base de données
          await newReview.save();
          return res.json(newReview)

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createReview,
}

