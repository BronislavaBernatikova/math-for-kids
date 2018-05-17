
exports.up = function(knex, Promise) {
  return knex.schema.table('answers', table => {
    table.integer('custom_expression_id').references('custom_expressions.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('answers', table => {
    table.integer('custom_expression_id').references('custom_expressions.id')
  })
};
