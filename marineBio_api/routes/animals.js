const express = require('express');
const router = express.Router();
const db = require('../db/animalsQ');

router.get('/', db.getAllAnimals);
router.get('/:id', db.getSingleAnimal);
router.post('/', db.addAnimal);
router.patch('/:id', db.updateAnimal);
router.delete('/:id', db.deleteAnimal);

module.exports = router;