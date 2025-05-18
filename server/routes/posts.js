const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');  

router.post('/createPost', auth, postController.createPost);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/getSpecificPost/:id', postController.getPostById);
router.delete('/deletePost/:id', auth, postController.deletePost);

module.exports = router;