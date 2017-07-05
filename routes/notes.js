// /api/notes route
const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET notes for practitioner or client
// GET notes where client_id && practitioner_id
router.post('/', function(req, res, next) {
  console.log('in notes route')
  let user_name
  let client_id
  let practitioner_id
  let user_id
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      user_name = payload.username
      if (payload.ispractitioner === true) {
        practitioner_id = payload.id
        client_id = req.body.requestedPersonID
      } else {
        client_id = payload.id
        practitioner_id = req.body.requestedPersonID
      }
      getClientNotes(client_id, practitioner_id)
    } else if (err) {
      res.send('please log in')
    }

    function getClientNotes(clientId, practId) {
      // get note by id
      knex('notes')
        .where('client_id', clientId)
        .where('practitioner_id', practitioner_id)
        .then((data) => {
          console.log('note data: ', data)
          res.json(data)
        })
    }
  })
})
// GET notes by id
router.get('/:id', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    let user_name
    let noteId = req.params.id
    if (payload) {
      user_name = payload.username
      getSpecificNote(user_name)
    } else if (err) {
      res.send('please log in')
    }

    function getSpecificNote(username) {
      // get note by id
      knex('notes')
        .where('id', noteId)
        .then((data) => {
          console.log('clients data: ', data)
          res.send(data)
        })
    }
  })
})
module.exports = router
