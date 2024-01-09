const express = require('express')
const router = express.Router()

const {newComment, getOne, getAll, update, deleteComment} = require('../controllers/commentController')

router.post('/newcomment', newComment)
router.get('/getone/:id', getOne)
router.get('/getall-comments', getAll)
router.patch('/update-comment/:id', update)
router.delete('/delete-comment/:id', deleteComment)

module.exports = router