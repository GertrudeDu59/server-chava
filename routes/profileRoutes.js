const express = require('express');
const router = express.Router();
const { deleteaccount, modifyaccount} = require('../controllers/profileController')

router.delete("/deleteaccount/:userid", deleteaccount)
router.put("/modifyaccount/userid", modifyaccount)
module.exports = router;