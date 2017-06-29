
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('notes').insert([
          { id: 1,
            practitioner_id: '1',
            client_id: 1,
            title: 'ROM and icing',
            content: 'Complete 5 minutes per day of gentle extension and flexion of the right elbo and ice before bed'
          }
        ])
      ])
    })
}
