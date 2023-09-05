// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile ,logOut} = require('../controllers/authController')
const { getUsers, getUserEmail } = require('../controllers/getController')
const { registerOptions } = require('../controllers/optionsController')
const { registerRatings } = require('../controllers/optionsController')

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
router.post('/Register', registerUser)
router.post('/Login', loginUser)
router.get('/Profile', getProfile)
router.delete('/logOut', logOut)
router.get("/users", getUsers)
router.get("/check", getUserEmail)
router.put("/registerOptions/:userId", registerOptions)
router.put("/registerRatings/:userId", registerRatings)

module.exports = router;