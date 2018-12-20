const express = require('express');
const router = express.Router();
const db = require('../db/taggingsQ');

router.get('/', db.getAllTaggings);
router.get('/:id', db.getSingleTagging);
router.get('/researchers/:id', db.taggingsByResearcher);
router.get('/animals/:id', db.taggingsOnAnimal);
router.post('/', db.addTagging);

module.exports = router;