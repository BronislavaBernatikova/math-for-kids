
exports.up = function(knex, Promise) {
  return knex.schema.table('quizes', table => {
    table.string('source')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quizes', table => {
    table.string('source')
  })
};
