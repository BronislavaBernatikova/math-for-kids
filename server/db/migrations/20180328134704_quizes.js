
exports.up = function(knex, Promise) {
  return knex.schema.createTable('quizes', table => {
    table.increments('id')
    table.date('date') // moment.js
    table.integer('expression_count')
    table.integer('right_answer_count')
    table.integer('user_id').references('users.id')
    table.time('time')
    table.timestamps(false,true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quizes')
};
