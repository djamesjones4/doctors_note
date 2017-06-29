const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const knex = require('../knex')
// const boom = require('boom')
const ev = require('express-validation')
const validations = require('../validations/signup')
const jwt = require('jsonwebtoken')

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
              username: data[0].username,
              id: data[0].id,
              is_admin: data[0].is_admin
            }, process.env.JWT_KEY)
            res.cookie('token', token, {
              httpOnly: true
            })
            if (data[0].is_admin === false) {
              res.redirect('/home')
            } else if (data[0].is_admin === true) {
              res.redirect('/admin')
            }
          } else {
            res.render('index', { error: 'Bad garden name or password' })
          }
        })
      } else {
        res.render('index', { error: 'Bad garden name or password' })
      }
    })
  } else if (email) {
    console.log(req.body)
    knex('users')
    .where('email', email)
    .then((data) => {
      if (data) {
        console.log('data: ', data)
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
          username: data[0].username,
          id: data[0].id,
          is_admin: data[0].is_admin
        }, process.env.JWT_KEY)
        res.cookie('token', token, {
          httpOnly: true
        })
        if (data[0].is_admin === false) {
          res.redirect('/home')
        } else if (data[0].is_admin === true) {
          res.redirect('/admin')
        }
      } else {
        // insert new user info from Google OAuth

        console.log('infinite loop')
        res.render('index', { error: 'Email does not exist' })
      }
    })
  }
})

module.exports = router
