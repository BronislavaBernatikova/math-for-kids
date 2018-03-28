
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('expressions', table => {
      table.increments('id');
      table.string('operator');
      table.integer('difficulty');
      table.integer('num1');
      table.integer('num2');
      table.float('solution');
      table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('expressions');
};
