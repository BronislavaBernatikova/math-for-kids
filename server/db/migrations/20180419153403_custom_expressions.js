
exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_expressions', table => {
    table.increments('id')
    table.integer('custom_quiz_id').references('custom_quizes.id')
    table.string('expression')
    table.float('solution')
    table.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_expressions')
};
