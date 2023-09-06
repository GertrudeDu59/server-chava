const User = require('../models/user');
const Profile = require('../models/profile')

const animalsFilter = async (req, res) => {
	const { animal_type } = req.params;

	try {
		const query = {};
		query[`pet_offer.${animal_type}`] = true;

		const users = await Profile.find(query).populate('user_id', 'fname lname town');
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};

const serviceFilter = async (req, res) => {
	const { service_type } = req.params;
	console.log(service_type)
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

module.exports = {
	animalsFilter,
	serviceFilter
};