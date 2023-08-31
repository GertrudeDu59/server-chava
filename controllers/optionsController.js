const User = require('../models/user');
const Options = require('../models/options');

const registerPetSitter = async (req, res) => {
	try {
		const { userId } = req.params;
		const {
			description,
			services,
			pet,
			petOffer,
			petSitter,
		} = req.body.options;

		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{
				'options.pet': pet,
				'options.petOffer': petOffer,
				'options.description': description,
				'options.services': services,
				'options.petSitter': petSitter,
			},
			{ new: true }
		);

		if (updatedUser) {
			return res.json({ message: "Options ont été modifiés", user: updatedUser });
		} else {
			return res.json({ error: "Impossible d'ajouter les options" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Erreur de serveur" });
	}
};


const registerRatings = async (req, res) => {
	try {
		const { userId } = req.params;
		const { rating, ratingNumber } = req.body.options;

		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{
				'options.rating': rating,
				'options.ratingNumber': ratingNumber,
			},
			{ new: true }
		);

		if (updatedUser) {
			return res.json({ message: "Ratings updated", user: updatedUser });
		} else {
			return res.json({ error: "Ratings update failed" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = {
	registerPetSitter,
	registerRatings
};
