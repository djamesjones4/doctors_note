// /api/notes route
const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET notes for practitioner or client
router.get('/:id', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    let user_name
    let noteId = req.params.id
    if (payload) {
      user_name = payload.username
      getClientInfo(user_name)
    } else if (err) {
      res.send('please log in')
    }

    function getClientInfo(username) {
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
