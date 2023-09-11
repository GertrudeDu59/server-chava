// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const { test, registerUser, loginUser, getToken, logoutUser,getUserEmail, registerProfile } = require('../controllers/authController')



// const test = (req, res) =>  {
//     res.json('teste is working')
// } on remplace ça par ce qu'il y a en dessous pour un travail plus propre et ordonnée. Et on l'ecris dans autchController à la place 
router.get('/', test)
// je le definie dans authControllers.

// Requete via le useContext
router.get('/token', getToken)

// Route de connexion et enregistrement
router.get("/check", getUserEmail)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put("/addprofile/:userId", registerProfile)
router.delete('/logout', logoutUser)




module.exports = router;