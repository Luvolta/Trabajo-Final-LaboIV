const express = require('express');
const { createIdeaHistory, getIdeaHistories } = require('../controllers/ideaHistorysController');
const router = express.Router();

router.post('/', createIdeaHistory);
router.get('/', getIdeaHistories);

module.exports = router;
