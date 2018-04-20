
exports.up = function(knex, Promise) {
  return knex.schema.createTable('current_quiz_set_ups', table => {
    table.increments('id')
    table.integer('parent_id').references('users.id')
    table.integer('child_id').references('users.id')
    table.integer('custom_quiz_id').references('custom_quizes.id')
    table.integer('difficulty')
    table.string('operator')
    table.integer('number_of_expressions')
    table.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('current_quiz_set_ups')
};
