
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.foreign('client_id').references(users.id).notNullable()
    table.foreign('pract_id').references(users.id).notNullable()
    table.boolean('ispractitioner').notNullable().defaultTo(false)
    table.boolean('isadmin').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {

};
