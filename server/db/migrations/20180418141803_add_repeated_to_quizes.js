
exports.up = function(knex, Promise) {
  return knex.schema.table('quizes', table => {
    table.integer('repeated')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quizes', table => {
    table.integer('repeated')
  });
};
