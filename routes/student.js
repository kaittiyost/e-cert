const express = require('express');
const StdController = require('../controllers/studentController');
const router = express.Router();

router.get('/home', StdController.StdCert)


module.exports = router;