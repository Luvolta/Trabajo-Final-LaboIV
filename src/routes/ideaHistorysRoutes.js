const express = require('express');
const { createIdeaHistory, getIdeaHistories, getIdeaById } = require('../controllers/ideaHistorysController');
const router = express.Router();

router.post('/', createIdeaHistory);
router.get('/:userId', getIdeaHistories); 
router.get('/idea/:ideaId', getIdeaById);

module.exports = router;
