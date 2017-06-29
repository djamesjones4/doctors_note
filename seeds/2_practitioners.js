
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('practitioners').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('practitioners').insert([
          { id: 1,
            firstname: 'John',
            lastname: 'Jones',
            username: 'drjones',
            hashed_password: '',
            email: 'jonesder@msu.edu',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }
        ])
      ])
    })
}
