const User = require('../models/user');
const Profile = require('../models/profile')

const animalsFilter = async (req, res) => {
	const { animal_type } = req.params;
	try {
		const animalTypesArray = animal_type.split(',');
			const query = {
			$or: animalTypesArray.map(animal_type => ({
			  [`pet_offer.${animal_type}`]: true
			}))
		  };
	
		const users = await Profile.find(query).populate('user_id', 'fname lname town');
		res.status(200).json(users);
	  } catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	  }
	};
const serviceFilter = async (req, res) => {
	const { service_type } = req.params;
	try {
		const query = {};
		query[`services.${service_type}`] = true;

		const users = await Profile.find(query).populate('user_id', 'fname lname town rating ratingNumber');
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};
const filterUsers = async (req, res) => {
	const { animal_type, service_type } = req.params;
  
	try {
	  let query = {};
  
	  if (animal_type) {
		const animalTypesArray = animal_type.split(',');
		query.$or = animalTypesArray.map(animal => ({
		  [`pet_offer.${animal}`]: true
		}));
	  }
  
	  if (service_type) {
		query[`services.${service_type}`] = true;
	  }
  
	  console.log(query);
  
	  const users = await Profile.find(query).populate('user_id', 'fname lname town rating ratingNumber');
	  res.status(200).json(users);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
  };
  
  

module.exports = {
	animalsFilter,
	serviceFilter,
	filterUsers
};