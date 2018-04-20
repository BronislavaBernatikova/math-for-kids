
exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_quizes',table => {
    table.increments('id')
    table.integer('user_id').references('users.id')
    table.string('title')
    table.integer('number_of_expressions')
    table.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_quizes')
};
