const express = require('express')
const router = express.Router()

const {createPost, getOne, getAll, update, deletePost} = require('../controllers/blogController')

router.post('/newblog', createPost)
router.get('/oneblog/:id', getOne)
router.get('/getall-posts', getAll)
router.patch('/update-post/:id', update)
router.delete('/delete-post/:id', deletePost)


module.exports = router