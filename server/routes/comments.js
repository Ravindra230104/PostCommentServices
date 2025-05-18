const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/addComment', auth, commentController.addComment);
router.get('/getAllComments/:post_id', commentController.getComments);
router.delete('/deleteComment/:id', auth, commentController.deleteComment);

module.exports = router;