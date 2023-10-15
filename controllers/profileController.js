const User = require('../models/user');
const Profile = require('../models/profile');


const deleteaccount = async (req, res) => {
    const { userid } = req.params;
    try {
        const user = User.findByIdAndDelete(userid);
        const profile = await Profile.findOneAndDelete({ user_id: userid });
        if (!user) {
            res.status(404).json({ error: "Votre compte n'a pas été trouvé" });
        }
        else if (!profile) {
            res.status(404).json({ error: "Votre profil n'a pas été trouvé" })
        }
        else {
            res.status(200).json({ message: "Compte supprimé avec succès" });
        }
    } catch {
        return res.status(500).json({ error: "Erreur base de données" });
    }
}
const modifyaccount = async (req, res) => {

}
module.exports = {
    deleteaccount,
    modifyaccount,
};
