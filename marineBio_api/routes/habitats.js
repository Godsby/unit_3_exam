const express = require('express');
const router = express.Router();
const db = require('../db/habitatsQ');

router.get('/', db.getAllHabitats);
router.get('/:id', db.getSingleHabitat);
router.post('/', db.addHabitat);

module.exports = router;