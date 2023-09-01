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
  
	  // Check if at least one checkbox is selected in each option
	  if (!Object.values(pet).some(value => value) ||
	      !Object.values(petOffer).some(value => value) ||
	      !Object.values(services).some(value => value)) {
		return res.json({
			error: 'Veuiller sélectionner au moins une options par catégorie'
		});
	  }
  
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
		return res.json({ message: "Options have been updated", user: updatedUser });
	  } else {
		return res.json({ error: "Unable to update options" });
	  }
	} catch (error) {
	  console.log(error);
	  return res.status(500).json({ error: "Server error" });
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
