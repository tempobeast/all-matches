const express = require('express');
const { generateImage } = require('../controllers/openAiController')
const { generateProfile } = require('../controllers/openAiProfileController')
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/generateprofile', generateProfile);

module.exports = router;