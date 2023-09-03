// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile ,logOut, registerAllUser} = require('../controllers/authController')
const { getUsers, getUserEmail } = require('../controllers/getController')
const { animalsFilter, serviceFilter } = require('../controllers/filtersController')
const { registerPetSitter,  registerRatings} = require('../controllers/optionsController')

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

// Requete post
router.post('/Register', registerUser)
router.post('/Login', loginUser)
router.post('/registerAll', registerAllUser)
// Requete get
router.get('/Profile', getProfile)
router.get("/users", getUsers)
router.get("/check", getUserEmail)
router.get("/animalsfilter/:animal_type", animalsFilter)
router.get("/servicesFilter/:service_type", serviceFilter)
// Requete delete
router.delete('/logOut', logOut)
// Requete modification
router.put("/registerRatings/:userId", registerRatings)
router.put("/registerPetSitter/:userId", registerPetSitter)

module.exports = router;