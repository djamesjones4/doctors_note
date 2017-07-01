const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const knex = require('../knex')
// const boom = require('boom')
const ev = require('express-validation')
const validations = require('../validations/signup')
const jwt = require('jsonwebtoken')

router.get('/', function(req, res, next) {
  res.send('you\'ve reached the sign in route')
})

router.post('/', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  if (username) {
    knex('clients')
          .where('username', username)
          .then((data) => {
            if (data.length > 0) {
              bcrypt.compare(password, data[0].hashed_password, (err, result) => {
                if (result) {
                  let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
                    id: data[0].id,
                    username: data[0].username,
                    is_client: data[0].isclient,
                    is_practitioner: data[0].ispractitioner,
                    is_admin: data[0].isadmin
                  }, 'secret')
                  res.json({ token: token })
                } else {
                  res.status(401).json({ error: 'Bad username or password' })
                }
              })
            } else {
              // check practitioner table
              knex('practitioners')
                .where('username', username)
                .then((practData) => {
                  if (practData.length > 0) {
                    bcrypt.compare(password, practData[0].hashed_password, (err, result) => {
                      if (result) {
                        let token = jwt.sign({
                          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
                          id: practData[0].id,
                          username: practData[0].username,
                          is_client: practData[0].isclient,
                          is_practitioner: practData[0].ispractitioner,
                          is_admin: practData[0].isadmin
                        }, 'secret')
                        res.json({ token: token })
                      } else {
                        res.status(401).json({ error: 'Bad username or password' })
                      }
                    })
                  } else {
                    res.status(401).json({ error: 'Bad username or password' })
                  }
                })
            }
          })
  }
})

    module.exports = router
