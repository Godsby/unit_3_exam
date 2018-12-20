const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost:5432/marinebio_api');

module.exports = db;