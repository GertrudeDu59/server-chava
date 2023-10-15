const express = require('express');
const router = express.Router();
const { deleteuser} = require('../controllers/adminController')

router.delete("/deleteuser", deleteuser)

module.exports = router;