require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: process.env.AWS_DATABASE_URL,
    pool: {
      min: 2,
      max: 20,
    },
    // connection: {
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   port: process.env.DB_PORT,
    //   timezone: 'UTC',
    //   dateStrings: true,
    //   // ssl      : process.env.DB_SSL,
    // },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.AWS_DATABASE_URL,
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
