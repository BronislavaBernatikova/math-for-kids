
exports.up = function(knex, Promise) {
  return knex.schema.table('custom_expressions', table => {
    table.integer('user_id').references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('custom_expressions', table => {
    table.integer('user_id').references('users.id')
  })
};
