const express = require('express')
const router = express.Router()
bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended:false }))

router.get('/home', (req,res) => {
  res.render('home')
})

router.get('/view-all-posts', (req,res) => {
  models.Post.findAll().then((posts) => {
    res.render('index', {posts:posts})
  })
})

router.get('/add-post', (req,res) => {
  res.render('addPost')
})

router.post('/add-post', (req,res) => {
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

router.post('/delete-post', (req,res) => {
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

router.get('/update-post/id/:id', (req,res) => {
  let id = req.params.id
  models.Post.findByPk(id).then((post) => {
    res.render('update', {post: post})
  })
})

router.post('/edit-post', (req,res) => {
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
      console.log(`Post with id ${post} was updated.`)
      res.redirect('/view-all-posts')
    })
})

router.post('/filter-by-category', (req,res) => {
  let category = req.body.category
  models.Post.findAll({
    where: {
      category: category
    }
  }).then((posts) => {
    res.render('index', {posts:posts})
  })
})

module.exports = router
