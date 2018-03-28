// Update with your config settings.
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'math_for_kids',
      // user:     'username',
      // password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  }

  // staging: { ... },
  //
  // test: { ... },
  //
  // production: { ... },

};
