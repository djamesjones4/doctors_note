exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('notes').insert([{
          id: 1,
          practitioner_id: 1,
          client_id: 1,
          title: 'ROM and Icing',
          content: 'Complete 5 minutes per day of gentle extension and flexion of the right elbo and ice before bed'
        }, {
          id: 2,
          practitioner_id: 4,
          client_id: 1,
          title: 'Soma',
          content: 'Words can be like X-rays if you use them properly. They\'ll go through anything.'
        }, {
          id: 3,
          practitioner_id: 3,
          client_id: 1,
          title: 'Know Yourself',
          content: 'Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.'
        }, {
          id: 4,
          practitioner_id: 5,
          client_id: 1,
          title: 'Know Yourself',
          content:
          'The power of nature exists in its silence. Human words cannot encode the meaning because human language has access only to the shadow of meaning.'
        }, {
          id: 5,
          practitioner_id: 1,
          client_id: 4,
          title: 'On Borgs',
          content:
          'Don\'t assimilate!'
        }, {
          id: 6,
          practitioner_id: 1,
          client_id: 1,
          title: 'Health of your head',
          content: 'Don\'t lose your hat...Ever!'
        }])
      ])
    })
}
