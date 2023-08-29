const User = require('../models/user');
const Options = require('../models/options');

const registerOptions = async (req, res) => {
	try {
		const { userId } = req.params; 
		const { description, image, services, pet } = req.body.options;

		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId }, 
			{
				'options.pet': pet, 
				'options.description': description, 
				'options.services': services,
				'options.image': image 
			},
			{ new: true } 
		);

		if (updatedUser) {
			return res.json({ message: "Options are updated", user: updatedUser });
		} else {
			return res.json({ error: "Options update failed" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = {
	registerOptions
};
