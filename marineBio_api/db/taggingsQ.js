const db = require('./index');

const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Taggings!',
      taggings: data
    })
  })
  .catch(err => next(err));
}

const getSingleTagging = (req, res, next) => {
  let tagId = parseInt(req.params.id);
  db.one('SELECT * FROM taggings WHERE id = $1', tagId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Recived One Tagging!',
      tagging: data
    })
  })
  .catch(err => next(err));
}

const taggingsByResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT * FROM taggings WHERE researcher_id = $1', researcherId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All tagginggs by A Researcher!',
      taggings: data
    })
  })
  .catch(err => next(err));
}

const taggingsOnAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any('SELECT * FROM taggings WHERE animal_id =$1', animalId)
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All tagginggs On An Animal!',
      taggings: data
    })
  })
  .catch(err => next(err));
}

const addTagging = (req, res, next) => {
  db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})',req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Add a tagging!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllTaggings,
  getSingleTagging,
  taggingsByResearcher,
  taggingsOnAnimal,
  addTagging
}