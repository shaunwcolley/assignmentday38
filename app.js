const express = require('express')
const mustacheExpress = require('mustache-express')
const path = require('path')
const bcrypt = require('bcrypt')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const app = express()
const VIEWS_PATH = path.join(__dirname, '/views')
const saltRounds = 10

let session = require('express-session')
app.use('/', postRoutes)
app.use('/', commentRoutes)
app.use(session({
  secret: 'Quoth the raven, beware, twas brillig',
  resave: false,
  saveUninitialized: true
}))


models = require('./models')
app.use('/css', express.static('css'))

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials'))
app.set('views', './views')
app.set('view engine', 'mustache')

app.listen(3000, () => console.log("live and let serve..."))
