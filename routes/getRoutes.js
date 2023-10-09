// Pour tester les requetes avec des API et AXIOS pour etre sur que tout fonctionne
const express = require('express');
const router = express.Router();

const { getPetSitters, getUsersHome, getProfileUser, getBooleanPet,getUser } = require('../controllers/getController')
const { animalsFilter, serviceFilter, filterUsers } = require('../controllers/filtersController');


router.get("/getprofile/:userId", getProfileUser)
router.get("/getbooleanpet/:userId", getBooleanPet)
router.get("/getuser/:id", getUser)

// Route pour la page home 
router.get("/getallusers", getUsersHome)

// Route pour les filtres sur la page service 
router.get("/getpetsitters", getPetSitters)
router.get("/animalsfilter/:animal_type", animalsFilter)
router.get("/servicesfilter/:service_type", serviceFilter)
router.get("/filterUsers/:service_type/:animal_type", filterUsers);

module.exports = router;