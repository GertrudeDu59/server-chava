const express = require('express');
const router = express.Router();
const { deleteuser} = require('../controllers/adminController')

router.delete("/deleteuser/:userId", deleteuser)

module.exports = router;