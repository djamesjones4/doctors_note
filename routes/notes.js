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
      res.json({ error: 'please log in' })
    }

    function getClientNotes(clientId, practId) {
      // get note by id
      knex('notes')
        .where('client_id', clientId)
        .andwhere('practitioner_id', practitioner_id)
        .then((data) => {
          console.log('note data: ', data)
          res.json(data)
        })
    }
  })
})
// Update notes
router.patch('/', function(req, res, next) {
  let noteId
  let noteContent
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      noteId = req.body.noteId
      console.log('note id: ', noteId)
      noteContent = req.body.noteContent
      updateNote(noteId, noteContent)
    } else if (err) {
      res.json({ error: "please log in" })
    }
  })
  function updateNote(id, content) {
    knex('notes')
    .where('id', id)
    .update({ content })
    .returning(['id', 'title', 'content'])
    .then((data) => {
      console.log('updated note data: ', data)
      res.json(data)
    })
  }
})

router.delete('/', (req, res, next) => {
  let noteId = req.body.noteId
  jwt.verfy(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      knex('notes')
      .del()
      .where('id', noteId)
      .debug(true)
      .then(() => {
        res.status(200)
      })
    } else if (err) {
      res.json({ error: 'please log in' })
    }
  })
})

module.exports = router
