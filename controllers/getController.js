
const User = require('../models/user');
const Profile = require("../models/profile")

const getPetSitters = async (req, res) => {
	try {
		const { limit, page } = req.query;
		const perPage = parseInt(limit) || 10;
		const currentPage = parseInt(page) || 1;

		const skip = (currentPage - 1) * perPage;

		const users = await Profile.find({ 'isPetSitter': true, }).populate('user_id', 'fname lname town')

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};

const getUserEmail = async (req, res) => {
	const { email } = req.query;
	try {
		const user = await User.findOne({ email });
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

const getUsersHome = async (req, res) => {
	try {
		const users = await User
			.find({ isAdmin: false })
			.sort({ _id: -1 })
			.limit(6)
			.populate('profile');

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
	}
};

const getProfileUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const profile = await Profile.findOne({ user_id: userId });

		if (profile) {
			return res.json({ message: "Votre profil a été trouvé", profile: profile });
		} else {
			return res.json({ error: "Votre profil n'a pas été trouvé" });
		}
	} catch (error) {
		console.error(error);
		return res.json({ error: "Erreur base de données" });
	}
};
const getUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findOne({ _id: userId });
		if (user) {
			// If the user is found, return their data as JSON
			return res.status(200).json({ message: "Votre profil a été trouvé", user });
		} else {
			// If the user is not found, return an error message
			return res.status(404).json({ error: "Votre profil n'a pas été trouvé" });
		}
	} catch (error) {
		console.error(error);
		// Handle database error
		return res.status(500).json({ error: "Erreur base de données" });
	}
};

const getBooleanPet = async (req, res) => {
	const { userId } = req.params;
	try {
		const profile = await Profile.findOne({ user_id: userId });

		if (profile) {
			if (profile.isPetSitter) {
				return res.json({ message: "Vous êtes un Pet Sitter", profile: profile });
			} else {
				return res.json({ message: "Vous n'êtes pas un Pet Sitter", profile: profile });
			}
		} else {
			return res.json({ error: "Votre profil n'a pas été trouvé" });
		}
	} catch (error) {
		console.error(error);
		return res.json({ error: "Erreur base de données" });
	}
};


module.exports = {
	getPetSitters,
	getUserEmail,
	getUsersHome,
	getProfileUser,
	getBooleanPet,
	getUser
}