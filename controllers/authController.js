const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// je fais un teste pour ne pas se retrouver bloquer plus tard et se demander d'ou vient le problem

const test = (req, res) => {
	res.json('Le teste fonctionne')
}


// REGISTER !!!
const registerUser = async (req, res) => {
	try {
		const { fname, lname, age, email, tel, town, password } = req.body;
		// j'verifie
		if (!fname) {
			return res.json({
				error: 'Le prénom est requis.'
			})
		};
		if (!lname) {
			return res.json({
				error: 'Le nom est requis.'
			})
		};

		const ageTimeStamp = new Date(age).getTime(); //crée un nouvel objet Date en utilisant la valeur date, getTime() pour obtenir le timestamp associé
		const ageMin = 16 * 365.25 * 24 * 60 * 60 * 1000; // 16 ans en millisecondes
		if (!age) {
			return res.json({
				error: 'Votre age est requis.'
			})
		} else if (Date.now() - ageTimeStamp < ageMin) {
			return res.json({
				error: 'Vous devez avoir 16 ans minimun.'
			})
		}


		// Verification d'une adresse email unique 
		const exist = await User.findOne({ email });
		if (exist) {
			return res.json({
				error: "L'adresse e-mail est déjà associée à un compte Chava"
			})
		}

		if (!tel) {
			return res.json({
				error: 'Le numero de téléphone est requis.'
			})
		} else if (/^(?:\+33|0)([1-9])(\d{2}){4}$/.test(tel)) {
			return res.json({
				error: 'Le numéro de téléphone doit être au format français valide.'
			})
		}

		if (!town) {
			return res.json({
				error: 'La ville est requise.'
			});
		} else if (!/^[a-zA-Z\s\-']+$/.test(town)) {
			return res.json({
				error: 'Le format de la ville est invalide'
			});
		}

		if (!password) {
			return res.json({
				error: 'Le mot de passe est requis'
			})

		} else if (password.length < 8) {
			return res.json({
				error: 'Le mot de passe doit contenir au moins 8 caractères.'
			})
		} else {
			if (!/\d/.test(password)) {
				return res.json({
					error: 'Le mot de passe doit contenir au moins un chiffre.'
				})
			}
			if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
				return res.json({
					error: 'Le mot de passe doit contenir au moins un caractère spécial.'
				})
			}
			if (!/[a-z]/.test(password)) {
				return res.json({
					error: 'Le mot de passe doit contenir au moins une lettre minuscule.'
				})
			}
			if (!/[A-Z]/.test(password)) {
				return res.json({
					error: 'Le mot de passe doit contenir au moins une lettre majuscule.'
				})
			}
		}


		// je créer la const hashedPassword qui va recuperer la fonction hashPassword avec comme parametre le mdp de l'user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
		const hashedPassword = await hashPassword(password)
		// créer l'user dans dataBase
		const user = await User.create({
			fname, lname, age, email, tel, town, password: hashedPassword,
		});

		return res.json(user)

	} catch (error) {
		console.log(error);
	}
}

// LOGIN !!!
const loginUser = async (req, res) => {
	try {
		// je vais chercher les info dans le req.body
		const { email, password } = req.body;
		//je verifie si l'utilisateur existe
		const user = await User.findOne({ email })
		//si user est false on retourne qu’il n’as pas encore de compte
		if (!user) {
			return res.json({
				error: "Pas d'email donc creer un compte"
			})
		}
		//verifie si le mot de passe est bon
		// comparePassword avec comme parametre password et le  hasspassword (voir ligne 83)
		const match = await comparePassword(password, user.password)
		// si le mdp est bon on ajoute un tokken donc un cookie qui va tracker durant l'application
		if (match) {
			//on utilise le parametre .sign cela va signer le token
			jwt.sign({ email: user.email, id: user._id, fname: user.fname, lname: user.lname }, process.env.JWT_SECRET, {expiresIn: '30m'},
				(err, token) => {
					if (err) throw err;
					res.cookie('token', token).json(user)
				})
		}
		if (!match) {
			return res.json({
				error: "Mdp incorect"
			})
		}
	} catch (error) {
		console.log(error)
	}
}


// TOKKEN
const getTokken = (req, res) => {
	// la req va etre le cookie token que l'on retrouve lorsqu'on login que l'on retrouve dans l'inpecteur network
	const { token } = req.cookies
	if (token) {
		// on verifie le json web token pour etre sur que c'est le bon
		jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
			if (err) throw err;
			res.json(user) // cela va nous donner l'user chaque fois qu'une page load car on a utilise useFfect en front
		})
	} else {
		res.json(null)
	}
}


const logOut = (req, res) => {
	const { token } = req.cookies;
	if (token) {
	  res.cookie('token', '', { expires: new Date(0) });
	  return res.json({
		message: 'Déconnexion réussie',
	  });
	} else {
	  return res.json({
		error: 'Erreur de base de données',
	  });
	}
  };


module.exports = {
	test,
	registerUser,
	loginUser,
	getTokken,
	logOut
}