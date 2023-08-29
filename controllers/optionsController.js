const User = require('../models/user');
const Options = require('../models/options'); // Import the Options model

const registerOptions = async (req, res) => {
	try {
		const { pet, service, description, image } = req.body;
		const options = await Options.create({
			pet,
			service,
			description,
			image,
		});
		const user = await User.findByIdAndUpdate(req.user._id, { $set: { options: options._id } }, { new: true });

		return res.json(user);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	registerOptions
}