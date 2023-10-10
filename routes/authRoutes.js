// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();
const { test, registerUser, loginUser, getToken, logoutUser,getUserEmail, registerProfile } = require('../controllers/authController')

router.get('/', test)
router.get('/token', getToken)
router.get("/check", getUserEmail)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put("/addprofile/:userId", registerProfile)
router.delete('/logout', logoutUser)




module.exports = router;