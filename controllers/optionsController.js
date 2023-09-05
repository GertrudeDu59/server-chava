const Profile = require('../models/profile');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const addProfile = async (req, res) => {
	try {
		const { userId } = req.params;
		const {
			description,
			services,
			pet_offer,
			pet_owner,
			isPetSitter,
		} = req.body;

		if (
			!Object.values(pet_owner).some(value => value) ||
			!Object.values(pet_offer).some(value => value) ||
			!Object.values(services).some(value => value)
		) {
			return res.json({
				error: 'Veuillez sélectionner au moins une option par catégorie',
			});
		}

		const updatedProfile = await Profile.create({
			'user_id': userId,
			'pet_offer': pet_offer,
			'pet_owner': pet_owner,
			'description': description,
			'services': services,
			'isPetSitter' : isPetSitter,
		});

		if (!updatedProfile) {
			return res.json({ error: 'Profil non trouvé' });
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profile: updatedProfile._id },
			{ new: true }
		);

		if (!updatedUser) {
			return res.json({ error: 'Utilisateur non trouvé' });
		}
		else {
			return res.json({
				message: 'Options mise à jour',
				user: updatedUser,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Erreur du serveur', details: error.message });
	}
};

module.exports = {
	addProfile,
};
