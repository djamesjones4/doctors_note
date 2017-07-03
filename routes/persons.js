const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET client's practitioner info for main view upon verifying token
router.post('/', function(req, res, next) {
  console.log('getting stuff')
  let user_name
  let client
  let practitioner
  let user_id
  console.log('req.body: ', req.body)
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      user_name = payload.username
      user_id = payload.id
      client = payload.is_client
      practitioner = payload.is_practitioner
    } else if (err) {
      res.status(401).json({ error: 'please log in' })
    }
    if (client) {
      getClientInfo(user_id)
    } else if (practitioner) {
      getPractitionerInfo(user_id)
    }

    function getClientInfo(userid) {
      knex('clients')
        .where('clients.id', userid)
        .join('practitioner_client', 'clients.id', '=', 'practitioner_client.client_id')
        .join('practitioners', 'practitioner_client.practitioner_id', '=', 'practitioners.id')
        .select(['client.id', 'practitioners.firstname', 'practitioners.lastname', 'practitioners.practitioner_type'])
        .then((data) => {
          console.log('client\'s data: ', data)
          res.json(data)
        })
    }
    function getPractitionerInfo(userid) {
      knex('practitioners')
        .where('practitioners.id', userid)
        .join('practitioner_client', 'practitioners.id', '=', 'practitioner_id')
        .join('clients', 'clients.id', '=', 'client_id')
        .select(['practitioners.id', 'clients.firstname', 'clients.lastname'])
        .then((data) => {
          console.log('practitioner\'s data: ', data)
          res.json(data)
        })
    }
  })
})
module.exports = router
