
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('practitioner_client').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('table_name').insert([
          { id: 1,
            client_id: 1,
            practitioner_id: 1
          }
        ])
      ])
    })
}
