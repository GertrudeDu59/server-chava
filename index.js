// setup
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();


// connection base de donnée
mongoose.connect(process.env.MONGO_URL)
// si c'est true on affiche database est connecté 
.then(() => console.log('Database connected'))
// sinon la database n'est pas connecté avec l'erreur en props
.catch((err) => console.log('Database not connected', err))

//MIDDLEWARE
// (middleware ça execute des action avant que la requette atteigne la destination final)
app.use(express.json())
app.use(cookieParser());
// Cette ligne de code dit au serveur comment "déballer" les informations envoyées depuis le formulaire, afin qu'il puisse les comprendre.
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/authRoutes')) // initialisation avec app on veut donc que toutes les routes aille vers '/'



// initalisation du port a ecouter
const port = 8000;
// fonction associé avec express appelé listen  pour ecouter le port avec une fonction anonyme qui appel le consol log
app.listen(port, () => console.log(`Server is running on port ${port}`))