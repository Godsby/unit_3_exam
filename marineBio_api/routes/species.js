const express = require('express');
const router = express.Router();
const db = require('../db/speciesQ');

router.get('/', db.getAllSpecies);
router.get('/:id', db.getSingleSpecies);
router.post('/', db.addSpecies);

module.exports = router;