const express = require('express')
const router = express.Router()

const {createPost, getOne, getAll, update, deletePost} = require('../controllers/blogController')

router.post('/newblog', createPost)
router.get('/oneblog/:id', getOne)
router.get('/getall-posts', getAll)
router.patch('/update-posts/:id', update)
router.delete('/delete/:id', deletePost)
// router.delete('/delete-posts/:id', deleteOne)
// router.delete('/delete-posts/:id', deletePostAndComments)


module.exports = router