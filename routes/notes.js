// /api/notes route
const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET notes for practitioner or client
// GET notes where client_id && practitioner_id
router.get('/', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    let practitioner_id = req.body.practitioner_id
    let client_id = req.body.client
    if (payload) {
      user_name = payload.username
      getClientNotes(user_name)
    } else if (err) {
      res.send('please log in')
    }

    function getClientNotes(username) {
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
