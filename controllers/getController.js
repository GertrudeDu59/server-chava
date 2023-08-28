
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur de récupération des utilisateurs" });
    }
};

module.exports = {
	getUsers
}