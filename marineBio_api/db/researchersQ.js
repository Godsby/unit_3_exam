const db = require('./index');

const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'All Researchers Received!',
      researchers: data
    })
  })
  .catch(err => next(err));
}

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id = $1', [researcherId])
  .then(data => {
    res.status(200).json({
      status: 'success',
      message: 'Recived One Researcher!',
      researcher: data
    })
  })
  .catch(err => next(err));
}

const addResearcher = (req, res, next) => {
  db.none('INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})',req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Add a researcher!'
    })
  })
  .catch(err => next(err));
}

// const updateResearcher = (req, res, next) => {
//   db.none('UPDATE researchers SET name = ${name}, job_title = ${job_title} WHERE id = ${id}', {
//     name: req.body.name,
//     job_title: req.body.job_title,
//     id: parseInt(req.params.id)
//   })
//   .then(() => {
//     res.status(200).json({
//       status: 'success',
//       message: 'Updated A Researcher!'
//     })
//   })
//   .catch(err => next(err));
// }

const updateResearcher = (req, res, next) => {
  let queryString = '';
  if(req.body.name && req.body.job_title) {
    queryString += 'UPDATE researchers SET name = ${name}, job_title = ${job_title} WHERE id = ${id}'
  } else if(req.body.name) {
    queryString += 'UPDATE researchers SET name = ${name} WHERE id = ${id}'
  } else {
    queryString += 'UPDATE researchers SET job_title = ${job_title} WHERE id = ${id}'
  }
  db.none(queryString, {
    name: req.body.name,
    job_title: req.body.job_title,
    id: parseInt(req.params.id)
  })
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Updated A Researcher!'
    })
  })
  .catch(err => next(err));
}

const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.none('DELETE FROM researchers WHERE id = $1', researcherId)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Deleted A Researcher!'
    })
  })
  .catch(err => next(err));
}

module.exports = {
  getAllResearchers,
  getSingleResearcher,
  addResearcher,
  updateResearcher,
  deleteResearcher
};