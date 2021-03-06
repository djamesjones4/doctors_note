// /api/practitioner
const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET practitioner's clients for main view upon token verification
router.get('/', function(req, res, next) {
  let user_id
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      user_id = payload.id
      getPractitionerInfo(user_id)
    } else if (err) {
      res.status(401).json('please log in')
    }

    function getPractitionerInfo(userid) {
      knex('practitioner_client')
        .where('practitioner_id', userid)
        .then((data) => {
          console.log('practitioner\'s data: ', data)
          res.json(data[0])
        })
    }
  })
})
module.exports = router
