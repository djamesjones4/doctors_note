
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
          }, {
            id: 2,
            firstname: 'Howard',
            lastname: 'Mertle',
            username: 'drmertle',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'me@me.com',
            practitioner_type: 'cardiologist',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }, {
            id: 3,
            firstname: 'Paulo',
            lastname: 'Coelho',
            username: 'drbrown',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'dan@me.com',
            practitioner_type: 'physical therapist',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }, {
            id: 4,
            firstname: 'Aldous',
            lastname: 'Huxley',
            username: 'drhuxley',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'huxley@steve.com',
            practitioner_type: 'Philosopher',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }, {
            id: 5,
            firstname: 'Malidoma',
            lastname: 'Some',
            username: 'drsome',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'some@steve.com',
            practitioner_type: 'Shaman',
            isclient: false,
            ispractitioner: true,
            isadmin: false
          }
        ])
      ])
    })
}
