const express = require('express');
const router = express.Router();
const db = require('../db/researchersQ');

router.get('/', db.getAllResearchers);
router.get('/:id', db.getSingleResearcher);
router.post('/', db.addResearcher);
router.patch('/:id', db.updateResearcher);
router.delete('/:id', db.deleteResearcher);

module.exports = router;