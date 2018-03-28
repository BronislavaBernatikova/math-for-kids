
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', table => {
    table.increments('id')
    table.boolean('correct_answer')
    table.integer('expression_id').references('expressions.id')
    table.integer('quiz_id').references('quizes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers')
};
