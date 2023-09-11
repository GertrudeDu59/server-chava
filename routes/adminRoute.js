const express = require('express');
const router = express.Router();

// Page administration
router.delete("/deleteuser/:userId",deleteuser)