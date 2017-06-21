const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')
// const boom = require('boom')
const ev = require('express-validation')
const validations = require('../validations/signup')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('signup')
// })

router.post('/', ev(validations.post), function(req, res, next) {
  knex('users')
  .where('username', req.body.username)
  .then(user => {
    if (user.length !== 0) {
      // possibly just res.send here
      res.render('signup', { error: 'Username already exists' })
    }
    let hashed = bcrypt.hashSync(req.body.password, 12)
    delete req.body.password
    req.body.hashed_password = hashed

    knex('clients')
    .insert(req.body)
    .returning(['id', 'firstname', 'lastname', 'username', 'email', 'isclient', 'ispractitioner', 'isadmin'])
    .then(data => {
      // this will not be redirecting for an android app, what should happen here?
      // perhaps res.status?
      // res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
  })
})

module.exports = router
