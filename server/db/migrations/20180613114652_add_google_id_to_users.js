exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('google_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('google_id')
  })
};
