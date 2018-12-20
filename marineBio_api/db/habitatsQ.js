const db = require('./index');

const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Received All Habitats',
      habitats: data
    })
  })
  .catch(err => next(err));
}

const getSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.one('SELECT * FROM habitats WHERE id = $1', habitatId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Received A Habitat!',
      habitat: data
    })
  })
  .catch(err => next(err));
}

const addHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Added A Habitat!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllHabitats,
  getSingleHabitat,
  addHabitat
}