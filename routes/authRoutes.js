// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getToken, logout } = require('../controllers/authController')
const { getPetSitters, getUserEmail, getUsersHome, getProfileUser, getBooleanPet } = require('../controllers/getController')
const { animalsFilter, serviceFilter } = require('../controllers/filtersController')
const { addProfile } = require('../controllers/optionsController')

//  middleware
// le router va utiliser cors qui contient 2 parametres 
router.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173'
	})
)
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
router.put("/addprofile/:userId", addProfile)
router.delete('/logout', logout)
router.get("/getprofile/:userId", getProfileUser)
router.get("/getbooleanpet/:userId", getBooleanPet)

// Route pour la page home 
router.get("/getusershome", getUsersHome)

// Route pour les filtres sur la page service 
router.get("/getpetsitters", getPetSitters)
router.get("/animalsfilter/:animal_type", animalsFilter)
router.get("/servicesfilter/:service_type", serviceFilter)






module.exports = router;