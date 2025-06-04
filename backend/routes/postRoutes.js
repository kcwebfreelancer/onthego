const express = require('express')
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, (req, res) => {
    getPosts(req, res)
})

router.post('/', protect, (req, res) => {
    createPost(req, res)
})

router.put('/:postId', protect, (req, res) => {
    updatePost(req, res)
})


router.delete('/:postId', protect, (req, res) => {
    deletePost(req, res)
})


module.exports = router;