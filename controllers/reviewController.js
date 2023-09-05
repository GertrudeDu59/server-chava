const Review = require('../models/reviews');

// Creer un nouvel avis
const createReview = async (req, res) => {
  try {
    const { content, rating, userId, profilId } = req.body; // Je les récupère dans req.body

    // Valider les données d'entrée manuellement
    if (!content || typeof content !== 'string') {
      return res.json({ error: 'Le champ content est obligatoire et doit être une chaîne de caractères.' });
    }

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.json({ error: 'Le champ rating est obligatoire et doit être un nombre entre 1 et 5.' });
    }

    const newReview = new Review({
      userId, // L'ID de l'utilisateur qui a créé la commentaire
      profilId, // L'ID de l'utilisateur qui a reçu la commentaire
      content, // Message que l'utilisateur a laissé
      rating, // Note de l'utilisateur à donné
    });
    // Enregistrer la commentaire dans la base de données
    await newReview.save();
    
    return res.json(newReview);
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const userId = req.body.userId; // Récupérez l'identifiant de l'utilisateur depuis req.body


    // Récupérez tous les commentaires où le profilId correspond à l'utilisateur
    const userReviews = await Review.find({ profilId: userId }).populate('userId');

    // Affichez les informations du profil et les commentaires sur la page du profil
    res.json({  userReviews });
    
  } catch (error) {
    console.error(error);
    res.json({ error: "Une erreur s'est produite lors de la récupération des données du profil." });
  }
};

module.exports = {
  createReview,
  getReviews,
};
