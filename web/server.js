'use strict'

const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

const signIn = require('./routes/signIn')
const client = require('./routes/client')
const practitioner = require('./routes/practitioner')
const notes = require('./routes/notes')

app.use('/api/signIn', signIn)
app.use('/api/client', client)
app.use('/api/practitioner', practitioner)
app.use('/api/notes', notes)

// app.use('*', function(req, res, next) {
//   res.sendFile('index.html', { root: path.join(__dirname, 'client') })
// })
const port = process.env.PORT || 3000

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('from server.js: Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = app
