const User = require('../models/user');

const animalsFilter = async (req, res) => {
	const { animal_type } = req.params;

	try {
		const query = {};
		query[`options.petOffer.${animal_type}`] = true;

		const users = await User.find(query);
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
		query[`options.services.${service_type}`] = true;

		const users = await User.find(query);
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