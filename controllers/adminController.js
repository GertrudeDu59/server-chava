const User = require('../models/user');
const Profile = require('../models/profile');

const deleteuser = async (req, res) => {
	const { isadmin, userid } = req.query;
	try {
	  if (isadmin) { 
		const user = await User.findByIdAndDelete(userid);
		if (!user) {
		  return res.json({ error: "Utilisateur introuvable" });
		}
		const profile = await Profile.findOneAndDelete({ user_id: userid });
  
		if (!profile) {
		  return res.json({ message: "Profile introuvable" });
		}
		return res.json({ message: "L'utilisateur et le profil ont été supprimés" });
	  } else {
		res.status(403).json({ error: "Vous n'avez pas l'autorisation" });
	  }
	} catch (error) {
	  console.error(error);
	  return res.json({ error: "Erreur base de données" });
	}
  };
  
  module.exports = {
	deleteuser,
  };
  