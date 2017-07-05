// /api/notes/update route
const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

router.post('/', function(req, res, next) {
  let noteId
  let noteContent
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      req.body.noteId = noteId
      req.body.noteContent = noteContent
      updateNote(noteId, noteContent)
    } else if (err) {
      res.json({ error: "please log in" })
    }
  })
  function updateNote(id, content) {
    knex('notes')
    .where('id', noteId)
    .update({ id, content })
    .then((data) => {
      console.log('updated note data: ', data)
      res.json(data)
    })
  }
})

module.exports = router
