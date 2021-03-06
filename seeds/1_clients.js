
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function() {
      return Promise.all([
      // Inserts seed entries
        knex('clients').insert([
          { id: 1,
            firstname: 'Derek',
            lastname: 'Jones',
            username: 'djamesjones4',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'djamesjones4@gmail.com',
            isclient: true,
            ispractitioner: false,
            isadmin: false
          }, {
            id: 2,
            firstname: 'Jimi',
            lastname: 'Hendricks',
            username: 'steve',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'steve@steve.com',
            isclient: true,
            ispractitioner: false,
            isadmin: false
          }, {
            id: 3,
            firstname: 'Dan',
            lastname: 'Brown',
            username: 'danbrown',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'dan@steve.com',
            isclient: true,
            ispractitioner: false,
            isadmin: false
          }, {
            id: 4,
            firstname: 'Patrick',
            lastname: 'Stewart',
            username: 'patrick',
            hashed_password: '$2a$12$dfoHuqRpfqkIZMcgt/Hw0eJnMFbT8/7fljzzy1B5sA7n7SILKxxra',
            email: 'pat@me.com',
            isclient: true,
            ispractitioner: false,
            isadmin: false
          }
        ])
      ])
    }).then(() => {
      return knex.raw("SELECT setval('clients_id_seq', (SELECT MAX(id) FROM clients));")
    })
}
