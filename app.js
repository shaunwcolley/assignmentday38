const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const path = require('path')
const bcrypt = require('bcrypt')
const models = require('./models')

const app = express()
const VIEWS_PATH = path.join(__dirname, '/views')
const saltRounds = 10

let session = require('express-session')
app.use(session({
  secret: 'Quoth the raven, beware, twas brillig',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended:false }))
app.use('/css', express.static('css'))

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials'))
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/home', (req,res) => {
  res.render('home')
})

app.get('/view-all-posts', (req,res) => {
  models.Post.findAll().then((posts) => {
    res.render('index', {posts:posts})
  })
})

app.get('/add-post', (req,res) => {
  res.render('addPost')
})

app.post('/add-post', (req,res) => {
  let title = req.body.title
  let body = req.body.body
  let category = req.body.category
  let post = models.Post.build({
    title: title,
    body: body,
    category: category
  })
  post.save().then((savedPost) => {
    console.log(savedPost)
    res.redirect('/view-all-posts')
  })
})

app.post('/delete-post', (req,res) => {
  let id = req.body.postID

  models.Post.destroy({
    where: {
      id: id
    }
  }).then((deletedPost) => {
    console.log(`Post with id ${deletedPost} was deleted`)
    res.redirect('/view-all-posts')
  })
})

app.get('/update-post/id/:id', (req,res) => {
  let id = req.params.id
  models.Post.findByPk(id).then((post) => {
    res.render('update', {post: post})
  })
})

app.post('/edit-post', (req,res) => {
  let id = req.body.id
  let title = req.body.title
  let body = req.body.body
  let category = req.body.category
  models.Post.update({
    title:title,
    body:body,
    category:category
  }, {
    where: {
      id:id
    }
  }).then((post) => {
      console.log(`Post ${post.title} was updated.`)
      res.redirect('/view-all-posts')
    })
})

app.post('/filter-by-category', (req,res) => {
  let category = req.body.category
  models.Post.findAll({
    where: {
      category: category
    }
  }).then((posts) => {
    res.render('index', {posts:posts})
  })
})

app.listen(3000, () => console.log("live and let serve..."))
