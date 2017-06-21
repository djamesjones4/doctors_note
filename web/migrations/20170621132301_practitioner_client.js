
exports.up = function(knex, Promise) {
  return knex.schema.createTable('practitioner_client', (table) => {
    table.increments()
    table.integer('client_id').references('clients.id').onDelete('cascade')
    table.integer('practitioner_id').references('practitioners.id').onDelete('cascade')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('practitioner_client')
}
