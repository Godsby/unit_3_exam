const db = require('./index');

const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Received All Animals!',
      animals: data
    })
  })
  .catch(err => next(err));
}

const getSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.one('SELECT * FROM animals WHERE id = $1',animalId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Received An Animal!',
      animal: data
    })
  })
  .catch(err => next(err));
}

const addAnimal = (req, res, next) => {
  db.none('INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Added An Animal!'
    })
  })
  .catch(err => next(err));
}

const updateAnimal = (req, res, next) => {
  let queryString = '';
  if(req.body.species_id && req.body.nickname) {
    queryString += 'UPDATE animals SET species_id = ${species_id}, nickname = ${nickname} WHERE id = ${id}'
  } else if(req.body.species_id) {
    queryString += 'UPDATE animals SET species_id = ${species_id} WHERE id = ${id}'
  } else {
    queryString += 'UPDATE animals SET nickname = ${nickname} WHERE id = ${id}'
  }

  db.none(queryString, {
    species_id: req.body.species_id,
    nickname: req.body.nickname,
    id: parseInt(req.params.id)
  })
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Updated An Animal!'
    })
  })
  .catch(err => next(err));
}

const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.none('DELETE FROM animals WHERE id = $1', animalId)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Deleted An Animal!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  addAnimal,
  updateAnimal,
  deleteAnimal
}