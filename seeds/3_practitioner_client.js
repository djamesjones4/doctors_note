
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('practitioner_client').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('practitioner_client').insert([
          { id: 1,
            client_id: 1,
            practitioner_id: 1
          }, {
            id: 2,
            client_id: 2,
            practitioner_id: 2
          }, {
            id: 3,
            client_id: 1,
            practitioner_id: 2
          }, {
            id: 4,
            client_id: 1,
            practitioner_id: 3
          }, {
            id: 5,
            client_id: 1,
            practitioner_id: 4
          },{
            id: 6,
            client_id: 1,
            practitioner_id: 5
          }
        ])
      ])
    })
}
