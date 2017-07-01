
exports.up = function(knex, Promise) {
  return knex.schema.createTable('practitioners', (table) => {
    table.increments()
    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.string('username').notNullable().unique()
    table.string('hashed_password').notNullable()
    table.string('email').notNullable().unique()
    table.string('practitioner_type').notNullable()
    table.boolean('isclient').notNullable().defaultTo(false)
    table.boolean('ispractitioner').notNullable().defaultTo(true)
    table.boolean('isadmin').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('practitioners')
}
