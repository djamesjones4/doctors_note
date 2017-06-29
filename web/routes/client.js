const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET data for client for main view upon verifying token
router.get('/', function(req, res, next) {
  let user_name
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_name = payload.username
      getClientInfo(user_name)
    } else if (err) {
      res.redirect('/')
    }

    function getClientInfo(username) {
      knex('clients')
        .where('username', username)
        .then((data) => {
          res.send(data)
        })
    }
  })
})
