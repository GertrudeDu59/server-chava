const User = require('../models/user');
const Options = require('../models/options');

const jwt = require('jsonwebtoken');

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

    if (
      !Object.values(pet).some(value => value) ||
      !Object.values(petOffer).some(value => value) ||
      !Object.values(services).some(value => value)
    ) {
      return res.json({
        error: 'Veuillez sélectionner au moins une option par catégorie',
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
      const token = jwt.sign(
        {
          email: updatedUser.email,
          id: updatedUser._id,
          fname: updatedUser.fname,
          lname: updatedUser.lname,
		  options: { petSitter: updatedUser.options.petSitter } 
        },
        process.env.JWT_SECRET,
        {}
      );

      res.cookie('token', token);

      return res.json({
        message: 'Options have been updated',
        user: updatedUser,
      });
    } else {
      return res.json({ error: 'Unable to update options' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
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
