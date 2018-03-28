const knexfile = require('../knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexfile[environment]);

module.exports = knex;
