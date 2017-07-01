
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
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'jonesder@msu.edu',
            practitioner_type: 'physician',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }
        ])
      ])
    })
}
