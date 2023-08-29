
const User = require('../models/user');

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
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


module.exports = {
	getUsers,
	getUserEmail
}