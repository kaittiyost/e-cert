const express = require('express');
const AdminController = require('../controllers/adminController');
const CertController = require('../controllers/certificateController')
const router = express.Router();

router.get('/AdminLogin', AdminController.AdminLogin)
router.post('/CheckLogin', AdminController.CheckLogin)
router.post('/Auth', AdminController.Auth)

router.get('/Home',CertController.AllCert)

router.get('/AddCertPage',CertController.AddCertPage)
router.get('/ChooseClassPage/:cert_code',CertController.ChooseClassPage)

router.post('/AddCert',CertController.AddCert)

module.exports = router;