// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getTokken ,logOut} = require('../controllers/authController')
const { getUsers, getUserEmail } = require('../controllers/getController')
const { createReview, getReviews } = require('../controllers/reviewController')

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

//AuthController
router.post('/Register', registerUser)
router.post('/Login', loginUser)
router.get('/tokken', getTokken)
router.delete('/logOut', logOut)
//GetController
router.get("/users", getUsers)
router.get("/check", getUserEmail)
//ReviewControllers
router.post('/createReview', createReview)
router.get('/GetReview', getReviews)




module.exports = router;