
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (table) => {
    table.increments()
    table.integer('practitioner_id').references('practitioners.id').notNullable().onDelete('cascade')
    table.integer('client_id').references('clients.id').notNullable().onDelete('cascade')
    table.string('title').notNullable()
    table.string('content').notNullable()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
}
