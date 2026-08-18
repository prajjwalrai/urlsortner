const express = require('express');
const router = express.Router();
const { createUrl, createPublicUrl, getUrls, searchUrls, deleteUrl } = require('../controllers/urlController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/public/create', createPublicUrl);

router.use(protect);

router.post('/create', createUrl);
router.get('/all', getUrls);
router.get('/search', searchUrls);
router.delete('/:id', deleteUrl);

module.exports = router;
