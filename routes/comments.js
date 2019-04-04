const express = require('express')
const router = express.Router()
bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended:false }))


router.get('/view-comments/postId/:postId', (req,res) => {
  let postId = req.params.postId
  models.Post.findByPk(postId, {
    include: [
      {
        model: models.Comment,
        as: 'comments'
      }
    ]
  }).then((post) => {
    res.render('view-comments', {post:post})
  })
})

router.post('/add-comment', (req,res) =>{
  let postId = req.body.postId
  let title = req.body.title
  let body = req.body.body
  let comment = models.Comment.build({
    title:title,
    body:body,
    postId:postId
  })
  comment.save().then((savedComment) => {
    console.log(`Comment ${title} was saved.`)
    res.redirect(`/view-comments/postId/${postId}`)
  })
})

router.post('/delete-comment', (req, res) => {
  let commentId = req.body.commentId
  let postId = req.body.postId

  models.Comment.destroy({
    where: {
      id: commentId
    }
  }).then((deletedComment) => {
    console.log(`Comment with id ${deletedComment} was deleted`)
    res.redirect(`/view-comments/postId/${postId}`)
  })
})

router.get('/edit-comment/commentid/:commentId', (req,res) => {
  let commentId = req.params.commentId
  models.Comment.findByPk(commentId).then((comment) =>{
    res.render('edit-comment', {comment:comment})
  })
})

router.post('/edit-comment', (req,res) => {
  let commentId = req.body.commentId
  let postId = req.body.postId
  let title = req.body.title
  let body = req.body.body
  models.Comment.update({
    title:title,
    body:body,
  }, {
    where: {
      id:commentId
    }
  }).then((updatedComment) => {
    console.log(`Comment with id ${updatedComment} was updated.`)
    res.redirect(`/view-comments/postId/${postId}`)
  })
})

module.exports = router
