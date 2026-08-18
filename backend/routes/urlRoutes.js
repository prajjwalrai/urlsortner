const express = require('express');
const router = express.Router();
const { createUrl, getUrls, searchUrls, deleteUrl } = require('../controllers/urlController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/create', createUrl);
router.get('/all', getUrls);
router.get('/search', searchUrls);
router.delete('/:id', deleteUrl);

module.exports = router;
