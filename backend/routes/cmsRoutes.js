const express = require('express');
const router = express.Router();
const { getAllCMS, getCMSByKey, updateCMSByKey } = require('../controllers/cmsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllCMS);
router.get('/:key', getCMSByKey);
router.put('/:key', protect, updateCMSByKey);

module.exports = router;
