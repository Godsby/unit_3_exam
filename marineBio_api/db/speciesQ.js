const db = require('./index');

const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Species Received!',
      species: data
    })
  })
  .catch(err => next(err));
}

const getSingleSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.one('SELECT * FROM species WHERE id = $1', [speciesId])
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Recived One Species!',
      Species: data
    })
  })
  .catch(err => next(err));
}

const addSpecies = (req, res, next) => {
  db.none('INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'succcess',
      message: 'Add A Species!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllSpecies,
  getSingleSpecies,
  addSpecies
};