
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', (table) => {
    table.increments().primary()
    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.string('username').notNullable().unique()
    table.string('hashed_password').notNullable()
    table.string('email').notNullable().unique()
    table.boolean('isclient').notNullable().defaultTo(true)
    table.boolean('ispractitioner').notNullable().defaultTo(false)
    table.boolean('isadmin').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients')
}
