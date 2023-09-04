
const User = require('../models/user');
const getUsers = async (req, res) => {
	try {
		const { limit, page } = req.query;
		const perPage = parseInt(limit) || 10;
		const currentPage = parseInt(page) || 1;

		const skip = (currentPage - 1) * perPage;

		const users = await User.find({ 'options.petSitter': true })
			.skip(skip)
			.limit(perPage);

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};

const getUserEmail = async (req, res) => {
	const { email } = req.query;
	try {
		const user = await User.findOne({ email })
		if (user) {
			return res.json({ message: "Votre email a été trouvé" });
		} else {
			return res.json({ error: "Votre email n'a pas été trouvé" });
		}
	} catch (error) {
		console.error(error);
		return res.json({ error: "Erreur base de données" });
	}
};


const getUsersBase = async (req, res) => {
	try {
		const users = await User
			.find()
			.sort({ _id: -1 })
			.limit(6);

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};

const getUserId = async (req, res) => {
	const { userid } = req.params;
	try {
		const user = await User.findOne({ userid })
		if (user) {
			return res.json({ message: "L'utilisateur correspond" });
		} else {
			return res.json({ error: "Id introuvable" });
		}
	} catch (error) {
		console.error(error);
		return res.json({ error: "Erreur base de données" });
	}

}

module.exports = {
	getUsers,
	getUserEmail,
	getUsersBase,
	getUserId
}