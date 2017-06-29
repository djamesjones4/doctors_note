// /api/practitioner
const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET all of the clients that this practitioner has
router.get('/', function(req, res, next) {
  let user_id
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
      getPractitionerInfo(user_id)
    } else if (err) {
      res.send('please log in')
    }

    function getPractitionerInfo(userid) {
      knex('practitioner_client')
        .where('practitioner_id', userid)
        .then((data) => {
          console.log('practitioner\'s data: ', data)
          res.send(data)
        })
    }
  })
})
module.exports = router
