const db = require('./index');

const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Sightings!',
      sightings: data
    })
  })
  .catch(err => next(err));
}

const sightingsByResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE researcher_id = $1', researcherId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Sightings by A Researcher!',
      sightings: data
    })
  })
  .catch(err => next(err));
}

const sightingsBySpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE species_id =$1', speciesId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Sightings By A Species!',
      sightings: data
    })
  })
  .catch(err => next(err));
}

const sightingsOnHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE habitat_id =$1', habitatId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Sightings On A Habitat!',
      sightings: data
    })
  })
  .catch(err => next(err));
}

const addSighting = (req, res, next) => {
  db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})',req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Add a sighting!'
    })
  })
  .catch(err => next(err));
}

const deleteSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id);
  db.none('DELETE FROM sightings WHERE id = $1', sightingId)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Deleted A Sighting!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllSightings,
  sightingsBySpecies,
  sightingsByResearcher,
  sightingsOnHabitat,
  addSighting,
  deleteSighting
}