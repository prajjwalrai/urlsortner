const express = require('express');
const router = express.Router();
const { redirectUrl } = require('../controllers/urlController');

// Define route for redirection
router.get('/:shortCode', redirectUrl);

module.exports = router;
