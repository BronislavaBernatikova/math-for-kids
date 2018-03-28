
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('first_name').notNull()
        table.string('last_name').notNull()
        table.string('email').unique().notNull()
        table.string('password_digest')
        table.timestamps(false, true)
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};

//bcrypt

// exports.up = function(knex, Promise) {
//   return knex.schema.table('users', table => {
//         table.string('password_digest')
//     });
// };

//
// exports.down = function(knex, Promise) {
//   return knex.schema.table('users', table => {
//     table.dropColumn('password_digest')
//   });
// };
