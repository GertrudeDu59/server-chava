const Comment  = require('../models/comment');


const getComment = async(req, res) => {
    
    try {
        //récupère l'ID de l'utilisateur 
       const userId = req.params.userId;
       //rechercher tous les commentaires qui ont un champ user correspondant à l'ID de l'utilisateur.
       const comments = await Comment.findOne({ user: userId})

       if (!comments) {
            return res.json({
                error: "Aucun commentaire"
            })
        //Si des commentaires sont trouvés, renvoyez-les en réponse à la demande
       }else if (comments) {
            res.json(comments)
       }

   } catch (error) {
    console.log(error)
   }

};



module.exports = {
	getComment
}