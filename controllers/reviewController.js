const Review  = require('../models/reviews');

// Creer un nouvel avis
const createReview = async (req,res) => {
    try {
        const {content, rating, userId, profilId} = req.body; // Je les récupéres dans review

        // Valider les données d'entrée manuellement
    if (!content || typeof content !== 'string') {
        return res.json({ error: 'Le champ content est obligatoire et doit être une chaîne de caractères.' });
      }
  
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.json({ error: 'Le champ rating est obligatoire et doit être un nombre entre 1 et 5.' });
      }

        const newReview = new Review({
            userId , // L'ID de l'utilisateur qui a créé la commentaire
            profilId, // L'ID de l'utilisateur qui à reçu la commentaire
            content, // Message que  l'utilisateur à laissé
            rating, // Note de l'utilisateur à donné
          });
          // Enregistrer la commentaire dans la base de données
          await newReview.save(error,result);
          return res.json(newReview)

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createReview,
}

