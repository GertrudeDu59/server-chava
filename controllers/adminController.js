const User = require('../models/user');
const Profile = require('../models/profile');

const deleteuser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			return res.json({ error: "Utilisateur introuvable" });
		}
		const profile = await Profile.findOneAndDelete({ user_id: userId });

		if (!profile) {
			return res.json({ message: "Profile introuvable" });
		}

		return res.json({ message: "L'utilisateur et le profil ont été supprimés" });
	} catch (error) {
		console.error(error);
		return res.json({ error: "Erreur base de données" });
	}
};

module.exports = deleteuser;

module.exports = {
	deleteuser
}