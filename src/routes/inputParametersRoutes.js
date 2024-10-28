const express = require('express');
const { createInputParameter, getInputParameters } = require('../controllers/inputParametersController');
const router = express.Router();

router.post('/', createInputParameter); 
router.get('/', getInputParameters);

module.exports = router;
