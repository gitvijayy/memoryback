const dotenv = require('dotenv');

dotenv.config();
const knex1 = require('knex');

const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');

const knex = knex1(knexConfig[ENV]);

module.exports = knex;
