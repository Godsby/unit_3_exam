const express = require('express');
const router = express.Router();
const db = require('../db/sightingsQ');

router.get('/', db.getAllSightings);
router.get('/species/:id', db.sightingsBySpecies);
router.get('/researchers/:id', db.sightingsByResearcher);
router.get('/habitats/:id', db.sightingsOnHabitat);
router.post('/', db.addSighting);
router.delete('/:id', db.deleteSighting);

module.exports = router;